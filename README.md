# 🚀 Downloader Frontend  
> Angular 18 + Tailwind CSS + Angular Universal (SSR)  
> One repo – three download modes: **Direct** | **Stream** | **Separated AV**  
> Plug-and-play with any backend by changing one line.

---
> Backend Repi : "https://github.com/Saadnadeemch/downloader-backend"

## 📌 TL;DR
| Mode | Use-case | Open-source backend | Status |
|---|---|---|---|
| **Direct** | Instant HTTP download | ✅ [Go repo](https://github.com/Saadnadeemch/downloader-backend) | shipped |
| **Stream** | WebSocket progress bar | ❌ (guide below) | DIY |
| **Separated AV** | 4K video + audio merge | ❌ (guide below) | DIY |

Clone → `npm i` → set `apiUrl` → `npm run serve:ssr` → done.

---

## 🧩 What’s inside
1. SEO-first SSR pages (Angular Universal)  
2. Mobile-first Tailwind UI  
3. Real-time progress via WebSocket (optional)  
4. Swap backends in 5 s (edit `environment.ts`)  
5. Modular services: `DirectDownloadService`, `StreamDownloadService`, `SeparatedAvService` – pick one or use all.

---

## 📦 Quick start (Direct mode)

git clone https://github.com/Saadnadeemch/downloader-frontend.git
cd downloader-frontend
npm install

# 1. point to your backend
# src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://my-go-backend.com/api'
};

# 2. dev with SSR
npm run build:ssr && npm run serve:ssr
# → http://localhost:4000
🔌 Backend endpoints you need
Table
Copy
Mode	Endpoint	Method	Payload / Query	Response
Direct	/api/video	GET	?url=YOUTUBE_URL	metadata JSON
Direct	/api/proxy-download	POST	{url, formatId}	file stream
Stream	/ws/progress	WebSocket	{taskId}	{percent, eta, speed}
Separated AV	/api/merge	POST	{videoUrl, audioUrl}	merged file stream
Replace /api prefix with your own by changing apiUrl.

🎨 Customise in 30 s
Table
Copy
What	Where
Theme colours	tailwind.config.js → extend.colors
Search filters	src/app/features/search/search.component.ts
Progress bar style	src/app/ui/progress-bar.component.ts
Add new backend	create YourBackendService implements DownloadAdapter
🚢 Production deploy
bash
Copy
npm run build:ssr        # dist/ ready
npm run serve:ssr         # Node cluster on :4000
# or docker
docker build -t downloader-front .
docker run -p 4000:4000 downloader-front
Put Caddy / Nginx in front:
Copy
example.com {
    reverse_proxy localhost:4000
}
🔍 SEO checklist (already done)
✅ Server-rendered routes (/video/:id)
✅ Dynamic meta tags (title, description, og:image)
✅ JSON-LD structured data
✅ Pre-render script for 404 & canonical URLs
