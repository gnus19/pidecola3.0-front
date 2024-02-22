"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="bg-white dark:bg-slate-800 md:shadow-lg dark:shadow-gray-900 md:rounded-xl p-6 w-full md:max-w-md md:border-solid md:border-2 md:border-slate-200 dark:md:border-slate-600">
      <h1 className="text-3xl text-center mb-12">Iniciar sesión</h1>
      <form className="flex flex-col items-center">
        <Input
          isRequired
          type="email"
          label="Email"
          labelPlacement="outside"
          placeholder="xx-xxxxxxx@usb.ve"
          description="Ingresa tu correo USB"
          className="mb-8"
          variant="bordered"
        />
        <Input
          isRequired
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
          variant="bordered"
        />

        <Button className="w-min mt-10 mb-4" color="primary" variant="shadow">
          Iniciar sesión
        </Button>
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
