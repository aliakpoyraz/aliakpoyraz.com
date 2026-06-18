import Script from "next/script";
import ProfileCard from "@/components/home/ProfileCard";
import Projects from "@/components/home/Projects";
import Experience from "@/components/home/Experience";
import Volunteering from "@/components/home/Volunteering";

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ali Akpoyraz',
  url: 'https://aliakpoyraz.com',
  jobTitle: 'Yazılım Mühendisi',
  sameAs: [
    'https://github.com/aliakpoyraz',
    'https://linkedin.com/in/aliakpoyraz',
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ali Akpoyraz',
  url: 'https://aliakpoyraz.com',
  description: 'Ben Ali Akpoyraz, yazılım mühendisliği öğrencisiyim. Bu sitede projelerimi, blog yazılarını ve kişisel deneyimlerimi paylaşıyorum.',
  inLanguage: ['tr', 'en'],
};

export default function Home() {
  return (
    <main className="flex flex-col items-center px-2 md:px-8 w-full pb-24">

      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />

      <div id="baslangic" className="w-full min-h-[calc(100vh-6rem)] md:min-h-[85vh] flex items-center justify-center mb-6 md:mb-12">
        <ProfileCard />
      </div>

      <div id="deneyim" className="w-full mb-20 md:mb-32">
        <Experience />
      </div>

      <div id="projeler" className="w-full mb-20 md:mb-32">
        <Projects />
      </div>

      <div id="gonulluluk" className="w-full">
        <Volunteering />
      </div>
    </main>
  );
}