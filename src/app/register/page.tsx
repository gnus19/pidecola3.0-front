import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
import autostop from "../../assets/autostop.jpg";

export default function Register() {
  return (
    <div className="flex flex-grow items-center justify-center py-20 relative">
      <Image
        src={autostop}
        alt="Imágen de fondo de una persona con un pulgar levantado"
        fill={true}
      />
      <RegisterForm />
    </div>
  );
}
