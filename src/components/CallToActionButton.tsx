"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const CallToActionButton = ({ className = "" }: { className?: string }) => {
  const router = useRouter();
  return (
    <Button
      size="lg"
      radius="full"
      className={`${className} bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 font-bold text-white animate-bounce animate-duration-[5000ms]`}
      onClick={() => router.push("/login")}
    >
      ¡Únete ahora!
    </Button>
  );
};

export default CallToActionButton;
