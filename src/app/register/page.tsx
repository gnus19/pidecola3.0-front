import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
import autostop from "../../assets/autostop.jpg";

export default function Register() {
  return (
    <div className="relative overflow-hidden w-full flex flex-grow items-center justify-center">
      <Image
        src={autostop}
        alt="Imágen de fondo de una persona con un pulgar levantado"
        placeholder="blur"
        className="object-cover absolute h-full w-full"
      />
      <RegisterForm />
    </div>
  );
}
