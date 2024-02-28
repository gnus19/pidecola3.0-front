import Image from "next/image";
import logo from "@/assets/logo.png";
import CallToActionButton from "@/components/CallToActionButton";

const HeroSection = () => {
  return (
    <section
      className={`
          relative flex flex-col lg:flex-row
          justify-start lg:justify-between items-center gap-10 sm:gap-24 lg:gap-0
          w-full text-center mt-10 pb-14 md:pb-24
          border-b-1 border-slate-300
        `}
    >
      <div className="w-full md:max-w-sm lg:max-w-md xl:max-w-lg">
        <h1 className="z-20 mb-20 sm:mb-10 text-3xl leading-tight font-black text-blue-950 dark:text-orange-50 animate-fade-up drop-shadow-md">
          {"En cada viaje compartido, tejemos historias, creamos lazos y "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-400  to-orange-500 animate-pulse animate-duration-[3000ms]">
            forjamos un camino juntos{" "}
          </span>
        </h1>

        <CallToActionButton />
      </div>

      <Image src={logo} alt="Logo del PideCola USB" className="w-60 lg:w-72" />
    </section>
  );
};

export default HeroSection;
