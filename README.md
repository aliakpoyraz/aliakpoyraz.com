# Ali Akpoyraz — Portfolio Website

<p align="center">
  <a href="https://aliakpoyraz.com">Website</a> ·
  <a href="https://github.com/aliakpoyraz/aliakpoyraz.com/blob/main/LICENSE">License</a> ·
  <a href="https://github.com/aliakpoyraz/aliakpoyraz.com">GitHub</a>
</p>

---

## Screenshots

### Desktop

| Light Mode (TR) | Dark Mode (EN) |
|:---:|:---:|
| ![Desktop Light TR](./public/img/readme/aliakpoyrazcom-desktop-light-tr.png) | ![Desktop Dark EN](./public/img/readme/aliakpoyrazcom-desktop-dark-en.png) |

| Blog (EN) | Blog (TR) |
|:---:|:---:|
| ![Blog EN](./public/img/readme/aliakpoyrazcom-blog-en.png) | ![Blog TR](./public/img/readme/aliakpoyrazcom-blog-tr.png) |

### Mobile

| Light (TR) | Dark (EN) |
|:---:|:---:|
| ![Mobile Light TR](./public/img/readme/aliakpoyrazcom-mobile-light-tr.png) | ![Mobile Dark EN](./public/img/readme/aliakpoyrazcom-mobile-dark-en.png) |

---

### [EN] English

A modern, high-performance personal portfolio and blog built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Features bilingual support (TR/EN), a GitHub activity heatmap, AI-powered blog summaries via Gemini API, and a sleek minimalist design with dark/light mode.

## Features

| Feature | Description |
|:--------|:------------|
| **Bilingual** | Full Turkish & English support with seamless `next-intl` switching |
| **Dark / Light Mode** | Smooth theme transitions with persistent user preference |
| **Fully Responsive** | Optimized for all devices — mobile, tablet, desktop |
| **Performance** | Next.js App Router, streaming SSR, and optimized assets for fast loads |
| **SEO Friendly** | Dynamic metadata, sitemap, RSS feed, and semantic HTML |
| **Blog with MDX** | Write posts in Markdown with embedded React components |
| **AI Summaries** | Automated technical blog summaries powered by Gemini API |
| **GitHub Activity** | Custom-themed contribution calendar (rose-themed) |
| **Minimalist UI** | Clean, premium aesthetic with subtle micro-interactions |
| **Security** | Security headers via Next.js config (CSP, XSS protection, etc.) |

## Tech Stack

| Category | Technology |
|:---------|:-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **UI Library** | [React 19](https://react.dev) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) + Typography plugin |
| **Internationalization** | [next-intl](https://next-intl.dev) |
| **Content** | [MDX](https://mdxjs.com) via `next-mdx-remote` + `gray-matter` |
| **Icons** | [Lucide React](https://lucide.dev) |
| **AI** | [Google Gemini API](https://ai.google.dev) (`@google/generative-ai`) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **Deployment** | [Vercel](https://vercel.com) |

## Project Structure

```
aliakpoyraz.com/
├── app/
│   ├── [locale]/          # Internationalized routes (tr, en)
│   │   ├── blog/          # Blog listing & post pages
│   │   ├── swift/         # Swift-related content
│   │   ├── page.tsx       # Homepage with sections
│   │   ├── layout.tsx     # Root layout with theme provider
│   │   └── ...
│   ├── globals.css        # Global styles & Tailwind layers
│   ├── sitemap.ts         # Dynamic sitemap generation
│   ├── robots.ts          # Robots.txt
│   └── rss.xml/           # RSS feed route
├── components/
│   ├── home/              # Homepage components
│   │   ├── ProfileCard    # Hero section with avatar & bio
│   │   ├── Experience     # Work experience timeline
│   │   ├── Projects       # Project showcase grid
│   │   ├── Volunteering   # Volunteer work cards
│   │   ├── SideNav        # Floating side navigation
│   │   ├── Footer         # Footer with social links
│   │   ├── ScrollToTop    # Scroll progress indicator
│   │   ├── Background     # Ambient background effects
│   │   └── ThemeToggle    # Dark/light mode toggle
│   ├── blog/              # Blog components
│   │   ├── BlogList       # Blog post listing
│   │   ├── AiSummary      # Gemini-powered summaries
│   │   ├── TableOfContents
│   │   ├── ShareButtons
│   │   ├── Callout, ProsCons, Accordion, etc.
│   │   └── ...
│   ├── layout/            # Layout wrappers & providers
│   └── context/           # React context (ThemeContext)
├── content/blog/          # MDX blog posts
├── messages/              # next-intl translation JSON files
├── lib/                   # Utility functions
├── public/
│   ├── img/readme/        # README screenshots
│   └── uploads/           # Blog post assets
├── scripts/               # Utility scripts (summaries, screenshots)
└── i18n.ts                # Internationalization config
```

## Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/aliakpoyraz/aliakpoyraz.com.git

# Navigate to the project
cd aliakpoyraz.com

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local   # Add your Gemini API key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build    # Build for production
npm run start    # Start production server
```

### Available Scripts

| Script | Description |
|:-------|:------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run summarize` | Generate AI summaries for blog posts |
| `npm run summarize:force` | Force regenerate all AI summaries |

## Environment Variables

| Variable | Description |
|:---------|:------------|
| `GEMINI_API_KEY` | Google Gemini API key for AI summaries |

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Ali Akpoyraz** — Software Engineering Student

- Website: [aliakpoyraz.com](https://aliakpoyraz.com)
- Email: [aliakpoyraz@gmail.com](mailto:aliakpoyraz@gmail.com)
- LinkedIn: [linkedin.com/in/aliakpoyraz](https://linkedin.com/in/aliakpoyraz)
- GitHub: [github.com/aliakpoyraz](https://github.com/aliakpoyraz)
- Instagram: [instagram.com/aliakpoyraz](https://instagram.com/aliakpoyraz)

---

<br />

---

### [TR] Türkçe

Modern teknolojilerle geliştirilmiş, yüksek performanslı kişisel portfolyo ve blog sitesi. **Next.js 16**, **React 19** ve **Tailwind CSS 4** ile inşa edildi. Çoklu dil desteği (TR/EN), GitHub aktivite haritası, Gemini API ile AI destekli blog özetleri ve koyu/açık tema gibi özellikler sunar.

## Özellikler

| Özellik | Açıklama |
|:--------|:---------|
| **Çoklu Dil** | next-intl ile Türkçe & İngilizce tam destek |
| **Koyu / Açık Tema** | Kullanıcı tercihini hatırlayan yumuşak geçişler |
| **Tamamen Duyarlı** | Mobil, tablet ve masaüstü için optimize edilmiş |
| **Performans** | App Router, streaming SSR ve optimize edilmiş varlıklar |
| **SEO Dostu** | Dinamik metadata, sitemap, RSS ve semantik HTML |
| **MDX Blog** | React bileşenleri ile zenginleştirilmiş Markdown içerik |
| **AI Özetleri** | Gemini API ile otomatik blog özetleri |
| **GitHub Aktivite** | Özelleştirilmiş rose temalı katkı takvimi |
| **Minimalist Tasarım** | Temiz, sade ve premium görünüm |
| **Güvenlik** | Next.js konfigürasyonu ile güvenlik başlıkları |

## Kullanılan Teknolojiler

| Kategori | Teknoloji |
|:---------|:----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **UI Kütüphanesi** | [React 19](https://react.dev) |
| **Stil** | [Tailwind CSS 4](https://tailwindcss.com) + Typography |
| **Uluslararasılaştırma** | [next-intl](https://next-intl.dev) |
| **İçerik Yönetimi** | [MDX](https://mdxjs.com) + `gray-matter` |
| **İkonlar** | [Lucide React](https://lucide.dev) |
| **Yapay Zeka** | [Google Gemini API](https://ai.google.dev) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **Dağıtım** | [Vercel](https://vercel.com) |

## Proje Yapısı

```
aliakpoyraz.com/
├── app/
│   ├── [locale]/          # Dil bazlı rotalar (tr, en)
│   │   ├── blog/          # Blog listeleme & yazı sayfaları
│   │   ├── swift/         # Swift içerikleri
│   │   ├── page.tsx       # Ana sayfa bölümleri
│   │   ├── layout.tsx     # Kök layout & tema sağlayıcı
│   │   └── ...
│   ├── globals.css        # Global stiller & Tailwind katmanları
│   ├── sitemap.ts         # Dinamik site haritası
│   ├── robots.ts          # Robots.txt
│   └── rss.xml/           # RSS beslemesi
├── components/
│   ├── home/              # Ana sayfa bileşenleri
│   │   ├── ProfileCard    # Kahraman bölümü (avatar & biyografi)
│   │   ├── Experience     # İş deneyimi zaman çizelgesi
│   │   ├── Projects       # Projeler grid gösterimi
│   │   ├── Volunteering   # Gönüllülük kartları
│   │   ├── SideNav        # Yan navigasyon menüsü
│   │   ├── Footer         # Alt bilgi & sosyal bağlantılar
│   │   ├── ScrollToTop    # Kaydırma ilerleme göstergesi
│   │   ├── Background     # Arkaplan efektleri
│   │   └── ThemeToggle    # Tema değiştirici
│   ├── blog/              # Blog bileşenleri
│   │   ├── BlogList       # Blog yazıları listesi
│   │   ├── AiSummary      # Gemini destekli özetler
│   │   ├── TableOfContents
│   │   ├── ShareButtons
│   │   └── ...
│   ├── layout/            # Layout sarmalayıcılar
│   └── context/           # React context
├── content/blog/          # MDX blog yazıları
├── messages/              # next-intl çeviri JSON dosyaları
├── lib/                   # Yardımcı fonksiyonlar
├── public/
│   ├── img/readme/        # README ekran görüntüleri
│   └── uploads/           # Blog yazısı görselleri
├── scripts/               # Yardımcı scriptler
└── i18n.ts                # Uluslararasılaştırma ayarları
```

## Başlangıç

### Gereksinimler

- **Node.js** 20+
- **npm** (veya pnpm / yarn)

### Kurulum

```bash
# Depoyu klonlayın
git clone https://github.com/aliakpoyraz/aliakpoyraz.com.git

# Proje dizinine gidin
cd aliakpoyraz.com

# Bağımlılıkları yükleyin
npm install

# Ortam değişkenlerini ayarlayın
cp .env.example .env.local   # Gemini API anahtarınızı ekleyin
```

### Geliştirme

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### Production Build

```bash
npm run build    # Production için derle
npm run start    # Production sunucusunu başlat
```

### Script'ler

| Script | Açıklama |
|:-------|:---------|
| `npm run dev` | Geliştirme sunucusunu başlat |
| `npm run build` | Production derlemesi yap |
| `npm run start` | Production sunucusunu başlat |
| `npm run lint` | ESLint çalıştır |
| `npm run summarize` | Blog yazıları için AI özetleri oluştur |
| `npm run summarize:force` | Tüm AI özetlerini zorla yeniden oluştur |

## Ortam Değişkenleri

| Değişken | Açıklama |
|:---------|:---------|
| `GEMINI_API_KEY` | Google Gemini API anahtarı (AI özetleri için) |

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

## İletişim

**Ali Akpoyraz** — Yazılım Mühendisliği Öğrencisi

- Website: [aliakpoyraz.com](https://aliakpoyraz.com)
- E-posta: [aliakpoyraz@gmail.com](mailto:aliakpoyraz@gmail.com)
- LinkedIn: [linkedin.com/in/aliakpoyraz](https://linkedin.com/in/aliakpoyraz)
- GitHub: [github.com/aliakpoyraz](https://github.com/aliakpoyraz)
- Instagram: [instagram.com/aliakpoyraz](https://instagram.com/aliakpoyraz)
