import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import autostop from "../../assets/autostop.jpg";

export default function Login() {
  return (
    <div className="flex flex-grow items-center justify-center py-20 relative">
      <Image
        src={autostop}
        alt="Imágen de fondo de una persona con un pulgar levantado"
        fill={true}
      />
      <LoginForm />
    </div>
  );
}
