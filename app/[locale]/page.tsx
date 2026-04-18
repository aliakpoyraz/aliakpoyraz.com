import ProfileCard from "@/components/home/ProfileCard";
import Projects from "@/components/home/Projects";
import Experience from "@/components/home/Experience";
import Volunteering from "@/components/home/Volunteering";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-2 md:px-8 w-full pb-24">
      <div id="baslangic" className="w-full min-h-[calc(100vh-6rem)] md:min-h-[85vh] flex items-center justify-center mb-6 md:mb-12">
        <ProfileCard />
      </div>

      <div id="deneyim" className="w-full mb-20 md:mb-32">
        <Experience />
      </div>

      <div id="gonulluluk" className="w-full mb-20 md:mb-32">
        <Volunteering />
      </div>

      <div id="projeler" className="w-full">
        <Projects />
      </div>
    </main>
  );
}