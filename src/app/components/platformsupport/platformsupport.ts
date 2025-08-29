import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Platform {
  name: string;
  logo: string;
  color: string;
  users: string;
}


@Component({
  selector: 'app-platformsupport',
  imports: [CommonModule],
  templateUrl: './platformsupport.html',
  styleUrl: './platformsupport.css'
})
export class Platformsupport {

  platforms: Platform[] = [
    { name: 'YouTube', logo: '🎥', color: 'from-red-500 to-red-600', users: '2B+' },
    { name: 'TikTok', logo: '🎵', color: 'from-black to-gray-800', users: '1B+' },
    { name: 'Instagram', logo: '📸', color: 'from-pink-500 to-purple-600', users: '2B+' },
    { name: 'Facebook', logo: '👥', color: 'from-blue-600 to-blue-700', users: '3B+' },
    { name: 'Twitter', logo: '🐦', color: 'from-blue-400 to-blue-500', users: '450M+' },
    { name: 'Vimeo', logo: '🎬', color: 'from-blue-500 to-indigo-600', users: '200M+' },
    { name: 'Dailymotion', logo: '📺', color: 'from-blue-600 to-blue-800', users: '300M+' },
    { name: 'Twitch', logo: '🎮', color: 'from-purple-600 to-purple-700', users: '140M+' },
  ];

  extraPlatforms: string[] = [
    'Reddit',
    'LinkedIn',
    'Pinterest',
    'Snapchat',
    'WeChat',
    'Telegram',
    'Discord',
    'Tumblr',
    'SoundCloud',
    'Spotify',
    'And Many More...',
  ];
}