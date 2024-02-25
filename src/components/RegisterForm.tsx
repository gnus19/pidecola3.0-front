"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { registerUser } from "@/lib/actions/users";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

const RegisterButton = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <Button
      isLoading
      className="w-min mt-10 mb-4"
      color="default"
      variant="shadow"
    >
      Crear cuenta
    </Button>
  ) : (
    <Button
      type="submit"
      className="w-min mt-10 mb-4"
      color="primary"
      variant="shadow"
    >
      Crear cuenta
    </Button>
  );
};

const RegisterForm = () => {
  const router = useRouter();
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirmation, setIsVisibleConfirmation] = useState(false);
  const [resMessage, dispatch] = useFormState(registerUser, undefined);

  // Redirect if login was successful
  if (resMessage?.status === 200) router.push("/profile");

  const togglePassVisibility = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  const toggleConfVisibility = () => {
    setIsVisibleConfirmation(!isVisibleConfirmation);
  };

  return (
    <div className="z-10 bg-slate-200/80 backdrop-blur-lg dark:bg-slate-800 md:shadow-lg dark:shadow-gray-900 md:rounded-xl p-6 w-full md:max-w-md md:border-solid md:border-2 md:border-slate-200 dark:md:border-slate-600">
      <h1 className="mb-12 [text-shadow:_2px_2px_5px_rgb(0_0_0_/_25%)] font-black text-neutral-700 dark:text-slate-300 text-3xl text-center ">
        Regístrate
      </h1>

      <form className="flex flex-col items-center" action={dispatch}>
        <Input
          isRequired
          name="email"
          type="email"
          label="Email"
          placeholder="xx-xxxxxxx@usb.ve"
          description="Ingresa tu correo USB"
          variant="faded"
          isInvalid={resMessage?.status === 403}
          errorMessage={resMessage?.status === 403 && resMessage?.message}
          className="mb-4"
        />

        <Input
          isRequired
          name="phoneNumber"
          type="text"
          label="Número de teléfono"
          labelPlacement="outside"
          placeholder="Ingresa tu número telefónico"
          className="mb-4"
          variant="faded"
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
              onClick={togglePassVisibility}
            >
              {isVisiblePass ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          }
          type={isVisiblePass ? "text" : "password"}
          className="mb-4"
          variant="faded"
        />

        <Input
          isRequired
          label="Confirma tu contraseña"
          labelPlacement="outside"
          placeholder="Vuelve a ingresar tu contraseña"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleConfVisibility}
            >
              {isVisiblePass ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          }
          type={isVisiblePass ? "text" : "password"}
          className="mb-4"
          variant="faded"
        />
        <RegisterButton />
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-blue-500">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
