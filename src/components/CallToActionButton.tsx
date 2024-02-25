"use client";

import { Button, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const CallToActionButton = () => {
  const router = useRouter();
  return (
    <Button
      size="lg"
      radius="full"
      variant="shadow"
      className="bg-gradient-to-br from-yellow-400  via-orange-500 to-red-500 font-bold text-white drop-shadow-lg animate-bounce animate-duration-[5000ms]"
      onClick={() => router.push("/login")}
    >
      Únete ahora!
    </Button>
  );
};

export default CallToActionButton;
