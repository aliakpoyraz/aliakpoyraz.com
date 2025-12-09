import ProfileCard from "../components/home/ProfileCard";
import Background from "../components/home/Background";
import Projects from "@/components/home/Projects";
import Experience from "@/components/home/Experience";
import Volunteering from "@/components/home/Volunteering";
import Divider from "@/components/home/Divider";

export default function Home() {
  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-1000">
      < Background />
      <ProfileCard />
      <Divider />
      <Experience />
      <Divider />
      <Volunteering />
      <Divider />
      <Projects />
      <Divider />


    </main>
  );
}