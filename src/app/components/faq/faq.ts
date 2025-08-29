import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
 faqs = [
    {
      question: 'Is VideoFlow completely free to use?',
      answer:
        'Yes, VideoFlow is 100% free to use. There are no hidden fees, subscriptions, or premium plans. You can download unlimited videos from any supported platform without any cost.',
    },
    {
      question: 'What video platforms and websites are supported?',
      answer:
        'VideoFlow supports over 1000+ platforms including YouTube, TikTok, Instagram, Facebook, Twitter, Vimeo, Dailymotion, Twitch, Reddit, LinkedIn, Pinterest, SoundCloud, and many more. We continuously add support for new platforms.',
    },
    {
      question: 'What video and audio formats can I download?',
      answer:
        'You can download videos in various formats including MP4, WebM, AVI, MOV, FLV, and more. For audio, we support MP3, AAC, FLAC, WAV, OGG, and other popular formats. Quality options range from 144p to 4K.',
    },
    {
      question: 'Are there any limits on downloads?',
      answer:
        'No, there are absolutely no limits on the number of downloads. You can download as many videos as you want, whenever you want. Our servers are optimized to handle high traffic and provide fast downloads.',
    },
    {
      question: 'Do you store my downloaded videos or personal data?',
      answer:
        "No, we do not store any videos on our servers. All downloads are processed in real-time and streamed directly to your device. We also don't collect or store any personal information. Your privacy is our top priority.",
    },
    {
      question: 'Can I download private or restricted videos?',
      answer:
        "No, VideoFlow can only download publicly available videos. We cannot access private, restricted, or copyrighted content that requires special permissions. Please respect content creators' rights and platform terms of service.",
    },
    {
      question: 'Does VideoFlow work on mobile devices?',
      answer:
        'Yes, VideoFlow is fully responsive and works perfectly on all devices including smartphones, tablets, laptops, and desktop computers. No app installation required - just use your web browser.',
    },
    {
      question: 'How fast are the downloads?',
      answer:
        'Download speeds depend on your internet connection and the video size. Our servers are optimized with CDN technology to provide the fastest possible download speeds. Most videos download within seconds.',
    },
    {
      question: 'Is it legal to download videos using VideoFlow?',
      answer:
        'Downloading videos for personal use is generally legal, but you should always respect copyright laws and platform terms of service. Only download content you have permission to download or that is in the public domain.',
    },
    {
      question: 'What should I do if a download fails?',
      answer:
        'If a download fails, try refreshing the page and attempting again. Make sure the video URL is correct and the video is publicly accessible. If problems persist, contact our support team for assistance.',
    },
  ];

  openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}