import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@nextui-org/react";
import usb from "../assets/usb.png";
import fce from "../assets/logo_federacion.png";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <section className="relative flex flex-col gap-8 md:gap-24 justify-between items-center px-10 md:px-40 pt-24 pb-10 min-h-[40vh] max-h-[70vh] text-center overflow-hidden">
        <h1 className="text-3xl md:text-5xl leading-tight font-black text-blue-950 animate-fade-up drop-shadow-md ">
          {"En cada viaje compartido, tejemos historias, creamos lazos y "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-400  to-orange-500 animate-pulse animate-duration-[3000ms]">
            forjamos un camino juntos{" "}
          </span>
        </h1>

        <Button
          size="lg"
          radius="full"
          variant="shadow"
          className="bg-gradient-to-br from-yellow-400  via-orange-500 to-red-500"
        >
          <Link
            href="/login"
            className="font-bold text-white drop-shadow-lg w-full h-full flex items-center"
          >
            Únete ahora!
          </Link>
        </Button>
      </section>

      <section className="flex flex-row mt-10 px-52 justify-between items-center">
        <Image
          src={usb}
          alt="Logo de la Universidad Simón Bolívar"
          height={150}
        />
        <Image
          src={fce}
          alt="Logo de la Federación de Centros de Estudiantes de la Universidad Simón Bolívar"
          height={150}
        />
      </section>
    </div>
  );
}
