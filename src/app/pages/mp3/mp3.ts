import { Component, HostListener, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { environment } from '../../../environment/environment';
import { Fetchinfo } from '../../services/fetchinfo';
import { Meta, Title } from '@angular/platform-browser';

interface AudioInfo {
  thumbnail: string;
  title: string;
  uploader: string;
  platform: string;
  duration: string;
  views?: string;
  likes?: string;
  downloadUrl: string | null;
  websocketId?: string;
  fileName?: string | null;
}

@Component({
  selector: 'app-mp3',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './mp3.html',
  styleUrl: './mp3.css'
})
export class Mp3 implements OnDestroy , OnInit {
  url = '';
  isLoading = false;
  audioInfo: AudioInfo | null = null;

  progressPercent = 0;
  showProgress = false;
  downloadReady = false;
  errorMessage: string | null = null;
  downloadText = 'Extract MP3';

  private ws: WebSocket | null = null;
  private requestId: string | null = null;
  private downloadUrl: string | null = null;
  private fileName: string | null = 'audio.mp3';

  wsBaseUrl = environment.wsBaseUrl;
  baseUrl = environment.baseUrl;

  constructor(
    private fetchinfo: Fetchinfo,
    private el: ElementRef,
    private title : Title,
    private  meta : Meta
  ) {}

ngOnInit(): void {
    this.title.setTitle("Downlaod Youtube Mp3 Online Free ")
    this.meta.updateTag({
      name: 'description',
      content: 'Download Mp3 from YouTube, TikTok, Instagram, and Facebook and Others easily using VideoSaver.'
    })
  }
  async handlePaste() {
    try {
      this.url = await navigator.clipboard.readText();
      console.log(`📋 Pasted URL: ${this.url}`);
    } catch (err) {
      console.error('❌ Failed to read clipboard:', err);
    }
  }

  handleDownloadRequest() {
    if (!this.url.trim()) return;

    console.log(`🎵 Audio download request for URL: ${this.url}`);

    this.isLoading = true;
    this.audioInfo = null;
    this.errorMessage = null;
    this.downloadText = 'Preparing...';
    this.showProgress = false;
    this.progressPercent = 0;
    this.downloadReady = false;
    this.requestId = Date.now().toString();

    if (this.ws) {
      console.warn('🔌 Closing previous WebSocket connection');
      this.ws.close();
    }

    // 🔗 API call to get audio info
    this.fetchinfo.getAudioInfo(this.url, this.requestId).subscribe({
      next: (data) => {
        console.log('ℹ️ Audio info received:', data);

        this.audioInfo = {
          thumbnail: data.audio_info.thumbnail,
          title: data.audio_info.title,
          uploader: data.audio_info.uploader,
          platform: data.audio_info.platform,
          duration: data.audio_info.duration || 'N/A',
          views: data.audio_info.views || 'N/A',
          likes: data.audio_info.like_count || 'N/A',
          downloadUrl: '',
          websocketId: data.websocket_id,
        };
        this.connectWebSocket(data.websocket_id);
      },
      error: (err) => {
        console.error('❌ Fetch error:', err);
        this.downloadText = 'Failed';
        this.errorMessage = 'Failed to fetch audio info.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private connectWebSocket(id: string) {
    console.log(`🔗 Connecting WebSocket with ID: ${id}`);
    this.ws = new WebSocket(`${this.wsBaseUrl}/${id}`);

    this.ws.onopen = () => {
      console.log('✅ WebSocket connected');
      this.showProgress = true;
      this.downloadText = 'Preparing Download';
    };

    this.ws.onmessage = (event) => {
      let msg: any;
      try {
        msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch {
        msg = event.data;
      }
      console.log('📨 WS message:', msg);

      if (typeof msg === 'object') {
        if (msg.status === 'error') {
          this.downloadText = 'Error';
          this.errorMessage = msg.message || 'An error occurred.';
          this.showProgress = false;
          this.downloadReady = false;
          return;
        }
        if (msg.status === 'completed') {
          this.progressPercent = 100;
          this.downloadText = 'Download Ready';
          this.showProgress = false;
          this.downloadReady = true;
          return;
        }
        if (msg.event === 'download_result' && msg.payload?.download_url) {
          this.downloadUrl = `${this.baseUrl}${msg.payload.download_url}`;
          this.fileName = msg.payload.file_name || 'audio.mp3';
          this.downloadText = 'Save To Device';
          this.showProgress = false;
          this.downloadReady = true;
          if (this.audioInfo) {
            this.audioInfo.downloadUrl = this.downloadUrl;
            this.audioInfo.fileName = this.fileName;
          }
          return;
        }
        if (typeof msg.progress === 'number') {
          this.progressPercent = msg.progress;
          this.downloadText = `Downloading ${Math.floor(msg.progress)}%`;
          this.showProgress = true;
        }
      }
    };

    this.ws.onerror = (err) => {
      console.error('❌ WS error:', err);
      this.downloadText = 'Error';
      this.errorMessage = 'WebSocket connection failed.';
    };

    this.ws.onclose = () => {
      console.warn('⚠️ WS closed');
      if (this.progressPercent < 100 && !this.downloadReady) {
        this.downloadText = 'Disconnected';
        this.errorMessage = 'WebSocket closed before completion.';
      }
    };
  }

  handleDownloadFile() {
    if (!this.downloadUrl) {
      this.errorMessage = 'Download URL missing.';
      return;
    }
    console.log(`⬇️ Triggering download: ${this.downloadUrl}`);

    const link = document.createElement('a');
    link.href = this.downloadUrl;
    link.download = this.fileName || 'audio.mp3';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ngOnDestroy() {
    console.log('♻️ Destroying MP3 component, closing WS');
    this.ws?.close();
  }

}
