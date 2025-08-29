import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


interface Feature {
  icon: string;        // we’ll use emoji or SVG path since lucide-react is React-only
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features {

  // Features array (we can later swap icons for Angular SVGs if you want lucide-angular)
  features: Feature[] = [
    {
      icon: '⚡',
      title: 'Lightning Fast Downloads',
      description: 'Download videos in seconds with our optimized servers and CDN network',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🌍',
      title: '1000+ Platforms Supported',
      description: 'YouTube, TikTok, Instagram, Facebook, Twitter, Vimeo and many more',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: '🎬',
      title: 'Multiple Formats',
      description: 'Download in MP4, WebM, AVI, MP3, AAC, FLAC and other popular formats',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🛡️',
      title: 'Secure & Private',
      description: 'No registration required. Your privacy is protected with SSL encryption',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⬇️',
      title: 'Unlimited Downloads',
      description: 'No limits on downloads. Download as many videos as you want for free',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: '⏰',
      title: '24/7 Availability',
      description: 'Our service is available round the clock with 99.9% uptime guarantee',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Works perfectly on all devices - desktop, tablet, and mobile phones',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🎧',
      title: 'Audio Extraction',
      description: 'Extract high-quality audio from videos in MP3, AAC, and other formats',
      color: 'from-pink-500 to-red-500'
    }
  ];
}