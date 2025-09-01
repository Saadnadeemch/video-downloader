import { Component, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fetchinfo } from '../../services/fetchinfo';
import { LucideAngularModule } from 'lucide-angular';
import { environment } from '../../../environment/environment';
import { log } from 'console';

// Core video metadata (only about the video itself)
interface VideoInfo {
  url : string;
  thumbnail: string;
  title: string;
  uploader: string;
  platform: string;
  description: string;
  duration: string;
  views: string;
  likes: string;
  downloadUrl: string | null;
  websocketId?: string;
  fileName?: string | null;
}

// Full backend response wrapper
interface VideoInfoResponse {
  websocket_id: string;
  type: 'separate-av' | 'stream-download' | 'direct-download';
  video_info: VideoInfo;
}

@Component({
  selector: 'app-searchbox',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './searchbox.html',
  styleUrl: './searchbox.css'
})
export class Searchbox implements OnDestroy {
  url = '';
  isLoading = false;
  videoInfo: VideoInfo | null = null;
  platformType: 'separate-av' | 'stream-download' | 'direct-download' | null = null;

  selectedQuality = '720p';
  downloadText = 'Download Now';
  progressPercent = 0;
  showProgress = false;
  downloadReady = false;
  errorMessage: string | null = null;

  showDropdown = false;
  qualityOptions = [
    '144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2k', '4k'
  ];

  private ws: WebSocket | null = null;
  private requestId: string | null = null;
  private downloadUrl: string | null = null;
  private fileName: string | null = 'video.mp4';

  wsBaseUrl = environment.wsBaseUrl;
  baseUrl = environment.baseUrl;

  constructor(
    private fetchinfo: Fetchinfo,
    private el: ElementRef
  ) { }

  selectQuality(q: string) {
    this.selectedQuality = q;
    this.showDropdown = false;
  }

  toggleDropdown(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.el.nativeElement.contains(target)) {
      this.showDropdown = false;
    }
  }

  async handlePaste() {
    try {
      this.url = await navigator.clipboard.readText();
    } catch (err) {
      console.error('❌ Failed to read clipboard:', err);
    }
  }

  handleDownloadRequest() {
    if (!this.url.trim()) return;

    this.isLoading = true;
    this.videoInfo = null;
    this.errorMessage = null;
    this.downloadText = 'Preparing For Download';
    this.showProgress = false;
    this.progressPercent = 0;
    this.downloadReady = false;
    this.requestId = Date.now().toString();

    if (this.ws) {
      console.warn('🔌 Closing previous WebSocket connection');
      this.ws.close();
    }

    this.fetchinfo.getVideoInfo(this.url, this.selectedQuality, this.requestId).subscribe({
      next: (data: VideoInfoResponse) => {
        console.log('ℹ️ Video info received:', data);

        // Assign response
        this.videoInfo = {
          ...data.video_info,
          websocketId: data.websocket_id,
        };

        this.platformType = data.type; // ✅ separate field
        this.connectWebSocket(data.websocket_id);
      },
      error: (err) => {
        console.error('❌ Fetch error:', err);
        this.downloadText = 'Download Failed';
        this.errorMessage = 'Failed to fetch video info.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private connectWebSocket(id: string) {
    this.ws = new WebSocket(`${this.wsBaseUrl}/${id}`);

    this.ws.onopen = () => {
      this.showProgress = true;
      this.downloadText = 'Preparing For Download';
    };

    this.ws.onmessage = (event) => {
      let msg: any;
      try {
        msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch {
        msg = event.data;
      }
      console.log('📨 WebSocket message:', msg);

      if (typeof msg === 'object') {
        if (msg.status === 'error') {
          this.downloadText = 'Error';
          this.errorMessage = msg.message || 'An error occurred.';
          this.showProgress = false;
          this.downloadReady = false;
          return;
        }
        if (msg.status === 'completed' || msg.message?.toLowerCase().includes('complete')) {
          console.log('✅ Download completed');
          this.progressPercent = 100;
          this.downloadText = 'Download Ready';
          this.showProgress = false;
          this.downloadReady = true;
          return;
        }
        if (msg.event === 'download_result' && msg.payload?.download_url) {
          this.downloadUrl = `${this.baseUrl}${msg.payload.download_url}`;
          this.fileName = msg.payload.file_name || 'video.mp4';
          this.downloadText = 'Save To Device';
          this.showProgress = false;
          this.downloadReady = true;
          if (this.videoInfo) {
            this.videoInfo.downloadUrl = this.downloadUrl;
            this.videoInfo.fileName = this.fileName;
          }
          console.log(`📁 File ready: ${this.fileName} (${this.downloadUrl})`);
          return;
        }
        if (typeof msg.progress === 'number') {
          this.progressPercent = msg.progress;
          this.downloadText = `${msg.message || 'Downloading'} ${Math.floor(msg.progress)}%`;
          this.showProgress = true;
        }
      } else if (typeof msg === 'string') {
        console.log(`📝 Raw WS string: ${msg}`);
        if (msg.startsWith('progress:')) {
          const percent = parseInt(msg.split(':')[1]);
          this.progressPercent = percent;
          this.downloadText = `Downloading ${percent}%`;
          this.showProgress = true;
        } else if (msg === 'completed') {
          this.progressPercent = 100;
          this.downloadText = 'Download Ready';
          this.showProgress = false;
          this.downloadReady = true;
        } else if (msg === 'error') {
          this.downloadText = 'Error';
          this.errorMessage = 'Download Failed';
          this.showProgress = false;
          this.downloadReady = false;
        }
      }
    };

    this.ws.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
      this.downloadText = 'Error';
      this.errorMessage = 'WebSocket connection failed.';
    };

    this.ws.onclose = () => {
      console.warn('⚠️ WebSocket closed');
      if (this.progressPercent < 100 && !this.downloadReady) {
        this.downloadText = 'Disconnected';
      }
    };
  }

  handleDownloadFile() {
    if (!this.downloadUrl) {
      this.errorMessage = 'Download URL is missing.';
      return;
    }
    console.log(`⬇️ Triggering download: ${this.downloadUrl}`);

    const link = document.createElement('a');
    link.href = this.downloadUrl;
    link.download = this.fileName || 'video.mp4';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

 

 

  ngOnDestroy() {
    this.ws?.close();
}

  handleDirectDownload(): void {
    if (!this.videoInfo?.downloadUrl  || !this.videoInfo?.title) {
      console.log(this.videoInfo?.downloadUrl , this.videoInfo?.title)
      this.errorMessage = 'Missing video information';
      return;
    }

    try {
      this.showProgress = true;
      this.downloadText = 'Starting...';

      this.fetchinfo.directDownload(this.videoInfo.downloadUrl , this.videoInfo.title);

      this.downloadText = 'Download Started';
    } catch (err) {
      this.errorMessage = 'Failed to start download';
      console.error(err);
    } finally {
      this.showProgress = false;
    }
  }

handleStream() {
    if (!this.videoInfo?.url || !this.videoInfo?.title) {
      this.errorMessage = 'Missing video information';
      return;
    }

    try {
      this.showProgress = true;
      this.downloadText = 'Starting...';

      this.fetchinfo.startStream(
        this.videoInfo.url,
        this.videoInfo.title
      );

      this.downloadText = 'Download Started';
    } catch (err) {
      this.errorMessage = 'Failed to start download';
      console.error(err);
    } finally {
      this.showProgress = false;
    }
  }
}