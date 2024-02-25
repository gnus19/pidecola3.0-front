"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { loginUser } from "@/lib/actions/users";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <Button
      type="submit"
      isLoading
      className="w-min mt-10 mb-4"
      color="default"
      variant="shadow"
    >
      Iniciar sesión
    </Button>
  ) : (
    <Button
      type="submit"
      className="w-min mt-10 mb-4"
      color="primary"
      variant="shadow"
    >
      Iniciar sesión
    </Button>
  );
};

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [resMessage, dispatch] = useFormState(loginUser, undefined);
  const router = useRouter();

  // Redirect if login was successful
  if (resMessage?.status === 200) router.push("/profile");

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="z-10 bg-slate-200/80 backdrop-blur-lg dark:bg-slate-800 md:shadow-lg dark:shadow-gray-900 md:rounded-xl p-6 w-full md:max-w-md md:border-solid md:border-2 md:border-slate-200 dark:md:border-slate-600">
      <h1 className="mb-12 [text-shadow:_2px_2px_5px_rgb(0_0_0_/_25%)] font-black text-neutral-700 dark:text-slate-300 text-3xl text-center ">
        Iniciar sesión
      </h1>

      <form className="flex flex-col items-center" action={dispatch}>
        <Input
          isRequired
          type="email"
          label="Email"
          name="email"
          labelPlacement="outside"
          placeholder="xx-xxxxxxx@usb.ve"
          description="Ingresa tu correo USB"
          isInvalid={resMessage?.message === "El usuario no existe"}
          errorMessage={
            resMessage?.message === "El usuario no existe" &&
            "El usuario no existe, ¿quisieras registrarte? "
          }
          variant="faded"
          className="mb-8"
        />
        <Input
          isRequired
          name="password"
          label="Contraseña"
          labelPlacement="outside"
          placeholder="Ingresa tu contraseña"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          }
          type={isVisible ? "text" : "password"}
          isInvalid={resMessage?.message === "Contraseña Incorrecta"}
          errorMessage={
            resMessage?.message === "Contraseña Incorrecta" &&
            "La contraseña es incorrecta"
          }
          variant="faded"
        />

        <LoginButton />
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        ¿Aún no estás registrado?{" "}
        <Link href="/register" className="text-blue-500">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
