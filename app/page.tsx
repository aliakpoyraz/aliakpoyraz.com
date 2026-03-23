import ProfileCard from "../components/home/ProfileCard";
import Projects from "@/components/home/Projects";
import Experience from "@/components/home/Experience";
import Volunteering from "@/components/home/Volunteering";
import Divider from "@/components/home/Divider";
import ActiveProjects from "@/components/home/ActiveProjects";

export default function Home() {
  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center p-4 md:p-8">
      <div id="baslangic" className="w-full">
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