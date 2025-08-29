import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Copy, Search, Download, CheckCircle, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-howitwork',
  imports: [CommonModule , LucideAngularModule],
  templateUrl: './howitwork.html',
  styleUrl: './howitwork.css'
})
export class Howitwork {
 steps = [
    {
      icon: Copy,
      title: 'Copy Video URL',
      description: 'Copy the link of any video from YouTube, TikTok, Instagram, or 1000+ other platforms',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Search,
      title: 'Paste & Analyze',
      description: 'Paste the URL in our search box and let our AI analyze the video content',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Download,
      title: 'Choose Format',
      description: 'Select your preferred format (MP4, MP3, WebM) and quality settings',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: CheckCircle,
      title: 'Download Instantly',
      description: 'Get your video downloaded instantly with our high-speed servers',
      color: 'from-orange-500 to-red-500'
    }
  ];
}