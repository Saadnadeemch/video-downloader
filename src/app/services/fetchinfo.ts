import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Fetchinfo {
 private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  /**
   * Fetches video information for a given URL and quality.
   */
  getVideoInfo(url: string, quality: string, requestId: string): Observable<any> {
    const payload = { url, quality, request_id: requestId };
    console.debug('[VideoService] Sending POST request → /api/getvideo', payload);
    return this.http.post(`${this.baseUrl}/getvideo`, payload);
  }

 
   getAudioInfo(url: string, requestId: string): Observable<any> {
    const payload = { url, request_id: requestId };
    console.debug('[VideoService] Sending POST request → /getaudio', payload);
    return this.http.post(`${this.baseUrl}/getaudio`, payload);
  }

   startStream(url: string, title: string): void {
    const baseUrl = environment.baseUrl;

    const streamUrl = `${baseUrl}/stream?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

    // Trigger browser download
    const link = document.createElement('a');
    link.href = streamUrl;
    link.download = `${title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  
  directDownload(
    downloadUrl: string,
    title: string
  ): void {
    const baseUrl = environment.baseUrl;
    const streamUrl = `${baseUrl}/proxy-download?url=${encodeURIComponent(
      downloadUrl
    )}&title=${encodeURIComponent(title)}`;

    // create invisible link and trigger download
    const link = document.createElement('a');
    link.href = streamUrl;
    link.download = `${title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
