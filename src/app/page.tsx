import Header from "@/components/Header";
import LogosSection from "@/sections/LogosSection";
import HeroSection from "@/sections/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-50 dark:bg-gray-800">
      <Header />

      <main className="flex flex-col grow items-center px-10 md:px-24 lg:px-32 xl:px-40 max-w-7xl">
        <HeroSection />
        <LogosSection />
      </main>
    </div>
  );
}
