import ProfileCard from "@/components/home/ProfileCard";
import Projects from "@/components/home/Projects";
import Experience from "@/components/home/Experience";
import Volunteering from "@/components/home/Volunteering";
import Divider from "@/components/home/Divider";
import ActiveProjects from "@/components/home/ActiveProjects";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-2 md:px-8 w-full">
      <div id="baslangic" className="w-full min-h-[calc(100vh-6rem)] md:min-h-[85vh] flex items-center justify-center">
        <ProfileCard />
      </div>
      <Divider />
      <div id="deneyim" className="w-full">
        <Experience />
      </div>
      <Divider />
      <div id="gonulluluk" className="w-full">
        <Volunteering />
      </div>
      <Divider />
      <div id="aktif-calismalar" className="w-full">
        <ActiveProjects />
      </div>
      <Divider />
      <div id="son-projeler" className="w-full">
        <Projects />
      </div>
      <Divider />
    </main>
  );
}