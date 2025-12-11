# Ali Akpoyraz - Kişisel Web Sitesi

Modern, responsive ve performanslı bir kişisel web sitesi. Next.js 16, React 19 ve TypeScript ile geliştirilmiştir.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Proje Yapısı](#-proje-yapısı)
- [Kullanım](#-kullanım)
- [Blog Yazma Rehberi](#-blog-yazma-rehberi)
- [Bileşenler](#-bileşenler)
- [Deployment](#-deployment)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

### Ana Sayfa
- **Profil Kartı**: Kişisel bilgiler, teknoloji stack ve sosyal medya linkleri
- **İş Deneyimi**: Timeline görünümünde iş ve staj deneyimleri
- **Gönüllülük**: Topluluk ve gönüllülük faaliyetleri
- **Projeler**: GitHub API ile otomatik proje listesi
- **Scroll Animasyonları**: Sayfa kaydırıldıkça içeriklerin animasyonlu görünmesi

### Blog Sistemi
- **MDX Desteği**: Markdown + React bileşenleri
- **Arama Fonksiyonu**: Başlık ve içerik bazlı arama
- **Okuma Süresi**: Otomatik hesaplanan okuma süresi
- **İçindekiler Tablosu**: Otomatik oluşturulan başlık navigasyonu
- **Paylaşım Butonları**: Twitter, LinkedIn ve link kopyalama
- **Okuma İlerlemesi**: Üst kısımda görünen okuma çubuğu
- **Özel Bileşenler**: Callout, Accordion, ProsCons, YouTube kartları ve daha fazlası

### Diğer Özellikler
- **CV Sayfası**: Detaylı özgeçmiş görüntüleme
- **Responsive Tasarım**: Mobil, tablet ve desktop uyumlu
- **Dark Mode**: Koyu tema tasarımı
- **SEO Optimizasyonu**: Meta taglar ve JSON-LD schema markup
- **Sitemap**: Otomatik oluşturulan sitemap.xml
- **Analytics**: Vercel Analytics entegrasyonu

## 🛠 Teknolojiler

### Framework & Kütüphaneler
- **Next.js 16.0.8** - React framework (App Router)
- **React 19.2.1** - UI kütüphanesi
- **TypeScript 5** - Tip güvenliği
- **Tailwind CSS 4** - Utility-first CSS framework
- **MDX** - Markdown + JSX desteği

### Önemli Paketler
- `next-mdx-remote` - MDX içerik yönetimi
- `gray-matter` - Frontmatter parsing
- `date-fns` - Tarih formatlama
- `lucide-react` - İkon kütüphanesi
- `@vercel/analytics` - Analytics

### Dev Tools
- **ESLint** - Kod kalitesi
- **PostCSS** - CSS işleme
- **Autoprefixer** - CSS vendor prefix'leri

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/aliakpoyraz/aliakpoyraz.com.git
cd aliakpoyraz.com
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## 📁 Proje Yapısı

```
aliakpoyraz.com/
├── app/                    # Next.js App Router sayfaları
│   ├── blog/              # Blog sayfaları
│   │   ├── [slug]/        # Dinamik blog yazı sayfası
│   │   └── page.tsx       # Blog listesi
│   ├── cv/                # CV sayfası
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   ├── globals.css        # Global stiller
│   └── sitemap.ts         # Sitemap oluşturucu
│
├── components/            # React bileşenleri
│   ├── blog/              # Blog bileşenleri
│   │   ├── Accordion.tsx
│   │   ├── BlogList.tsx
│   │   ├── Callout.tsx
│   │   ├── CaptionImage.tsx
│   │   ├── ProsCons.tsx
│   │   ├── ReadingProgress.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── TableOfContents.tsx
│   │   └── YoutubeCard.tsx
│   └── home/              # Ana sayfa bileşenleri
│       ├── Background.tsx
│       ├── Divider.tsx
│       ├── Experience.tsx
│       ├── Footer.tsx
│       ├── Navbar.tsx
│       ├── ProfileCard.tsx
│       ├── Projects.tsx
│       ├── ScrollToTop.tsx
│       └── Volunteering.tsx
│
├── content/               # MDX blog yazıları
│   ├── nasil-kullanilir.mdx
│   └── vercel-cloudflarepages-githubpages.mdx
│
├── lib/                   # Yardımcı fonksiyonlar
│   ├── mdx.ts            # MDX işleme fonksiyonları
│   └── useScrollAnimation.ts  # Scroll animasyon hook'u
│
├── public/                # Statik dosyalar
│   ├── uploads/          # Resimler ve dosyalar
│   └── ...
│
├── next.config.ts        # Next.js konfigürasyonu
├── tsconfig.json         # TypeScript konfigürasyonu
├── tailwind.config.js    # Tailwind konfigürasyonu
└── package.json          # Proje bağımlılıkları
```

## 💻 Kullanım

### Ana Sayfa İçeriğini Düzenleme

#### Profil Kartı (`components/home/ProfileCard.tsx`)
- İsim, unvan ve biyografi bilgilerini güncelleyin
- `socialLinks` array'ini düzenleyerek sosyal medya linklerini değiştirin
- `techStack` array'ini düzenleyerek teknoloji rozetlerini güncelleyin

#### İş Deneyimi (`components/home/Experience.tsx`)
- `experiences` array'ine yeni deneyimler ekleyin
- Her deneyim için: şirket, rol, tarih, konum, açıklama ve teknolojiler

#### Gönüllülük (`components/home/Volunteering.tsx`)
- `volunteers` array'ine yeni gönüllülük faaliyetleri ekleyin

#### Projeler (`components/home/Projects.tsx`)
- GitHub API'den otomatik çekilir
- `GITHUB_USERNAME` değişkenini güncelleyin
- GitHub'da public ve fork olmayan repolar gösterilir

### Navbar Düzenleme

`components/home/Navbar.tsx` dosyasında `navItems` array'ini düzenleyin:

```typescript
const navItems = [
    { icon: <Home size={22} />, href: "/", label: "Anasayfa" },
    { icon: <FileUser size={22} />, href: "/cv", label: "CV" },
    { icon: <BookOpen size={22} />, href: "/blog", label: "Blog" },
];
```

## 📝 Blog Yazma Rehberi

### Yeni Blog Yazısı Ekleme

1. **MDX dosyası oluşturun**
```bash
# content/ klasöründe yeni bir .mdx dosyası oluşturun
touch content/yeni-yazi.mdx
```

2. **Frontmatter ekleyin**
```markdown
---
title: "Yazı Başlığı"
date: "10-12-2025"
description: "Yazı açıklaması"
image: "/uploads/resim.jpg"  # Opsiyonel
---

Yazı içeriği buraya gelir...
```

3. **Markdown yazın**
```markdown
## Başlık

Paragraf metni...

- Liste öğesi 1
- Liste öğesi 2
```

### Özel MDX Bileşenleri

#### Callout (Uyarı/Kutu)
```markdown
<Callout type="info" title="İpucu">
Bu bir bilgi kutusudur.
</Callout>

<Callout type="warning">
Bu bir uyarı kutusudur.
</Callout>

<Callout type="success" title="Başarılı">
İşlem tamamlandı!
</Callout>

<Callout type="error">
Bir hata oluştu.
</Callout>
```

#### Accordion (Akordiyon)
```markdown
<Accordion title="Başlık">
İçerik buraya gelir...
</Accordion>
```

#### ProsCons (Artılar/Eksiler)
```markdown
<ProsCons
  pros={["Artı 1", "Artı 2"]}
  cons={["Eksi 1", "Eksi 2"]}
/>
```

#### YouTube Kartı
```markdown
<YouTubeCard url="https://www.youtube.com/watch?v=VIDEO_ID" />
```

#### Resim (Alt Yazılı)
```markdown
<CaptionImage 
  src="/uploads/resim.jpg" 
  alt="Açıklama"
  caption="Resim alt yazısı"
/>
```

### Tarih Formatı

Frontmatter'da tarih formatı: `DD-MM-YYYY`
- Örnek: `10-12-2025` (10 Aralık 2025)

## 🧩 Bileşenler

### Ana Sayfa Bileşenleri

- **ProfileCard**: Kişisel profil kartı
- **Experience**: İş deneyimi timeline'ı
- **Volunteering**: Gönüllülük kartları
- **Projects**: GitHub projeleri listesi
- **Navbar**: Üst navigasyon menüsü
- **Footer**: Alt bilgi ve sosyal linkler
- **ScrollToTop**: Yukarı kaydırma butonu
- **Background**: Arka plan efektleri

### Blog Bileşenleri

- **BlogList**: Blog yazılarının listesi ve arama
- **TableOfContents**: İçindekiler tablosu
- **ReadingProgress**: Okuma ilerleme çubuğu
- **ShareButtons**: Sosyal medya paylaşım butonları
- **Callout**: Bilgi/uyarı kutuları
- **Accordion**: Açılır/kapanır bölümler
- **ProsCons**: Artılar/eksiler karşılaştırması
- **YouTubeCard**: YouTube video gömme
- **CaptionImage**: Alt yazılı resim

### Yardımcı Hook'lar

- **useScrollAnimation**: Scroll animasyonu için Intersection Observer hook'u

## 🚢 Deployment

### Vercel (Önerilen)

1. **Vercel hesabınıza giriş yapın**
2. **"New Project" butonuna tıklayın**
3. **GitHub repository'nizi bağlayın**
4. **Otomatik deploy başlar**

Vercel Next.js'i otomatik algılar ve optimize edilmiş build oluşturur.

### Diğer Platformlar

#### Netlify
```bash
npm run build
# .next klasörünü deploy edin
```

#### Cloudflare Pages
```bash
npm run build
# .next klasörünü deploy edin
```

#### GitHub Pages
```bash
npm run build
npm run export  # Static export için
# out klasörünü deploy edin
```

### Environment Variables

Şu anda environment variable gerektirmiyor, ancak gelecekte eklenebilir:
- `GITHUB_TOKEN` (GitHub API rate limit için)
- `ANALYTICS_ID` (Analytics için)

## 🎨 Özelleştirme

### Renkler

Renkler Tailwind CSS ile yönetiliyor. Ana renkler:
- Arka plan: `#09090b` (zinc-950)
- Metin: `#e4e4e7` (zinc-200)
- Vurgu: `indigo-500` (indigo)

### Fontlar

Inter fontu Google Fonts'tan yükleniyor (`app/layout.tsx`).

### Animasyonlar

Scroll animasyonları `lib/useScrollAnimation.ts` hook'u ile yönetiliyor.

## 🐛 Sorun Giderme

### MDX Dosyaları Görünmüyor
- Dosya adının `.mdx` uzantılı olduğundan emin olun
- Frontmatter'ın doğru formatta olduğunu kontrol edin
- Tarih formatının `DD-MM-YYYY` olduğunu doğrulayın

### GitHub Projeleri Görünmüyor
- GitHub username'in doğru olduğunu kontrol edin
- Repoların public olduğundan emin olun
- API rate limit'ine takılmadığınızı kontrol edin

### Build Hataları
```bash
# Cache'i temizleyin
rm -rf .next
rm -rf node_modules
npm install
npm run build
```


---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
