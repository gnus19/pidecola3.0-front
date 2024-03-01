"use client";

import Link from "next/link";
import { User } from "@nextui-org/user";
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserEmail } from "@/lib/actions/users";

const UserActions = () => {
  const [email, setEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const isLoginOrRegister = pathname === "/login" || pathname === "/register";

  const iconClasses = "pointer-events-none w-5";

  useEffect(() => {
    const updateUserData = async () => {
      const userData = await getUserEmail();
      setEmail(userData?.email);
    };

    updateUserData();
  }, []);

  return isLoginOrRegister ? (
    <></>
  ) : (
    <Dropdown>
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            showFallback: true,
            fallback: <UserIcon className="w-6 h-6 text-default-500" />,
          }}
          name={email ? email : "Inicia sesión"}
          description={email ? "" : "O regístrate"}
        />
      </DropdownTrigger>

      {email ? (
        <DropdownMenu aria-label="User Actions" color="warning">
          <DropdownItem
            key="perfil"
            startContent={<Cog6ToothIcon className={iconClasses} />}
          >
            <Link href="/profile" className="block w-full">
              Configuración
            </Link>
          </DropdownItem>

          <DropdownItem
            key="cerrar sesión"
            className="text-danger"
            color="danger"
            startContent={
              <ArrowLeftStartOnRectangleIcon className={iconClasses} />
            }
          >
            <Link href="/logout" className="block w-full">
              Cerrar sesión
            </Link>
          </DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu aria-label="User Actions" color="warning">
          <DropdownItem
            key="iniciar sesión"
            startContent={
              <ArrowRightEndOnRectangleIcon className={iconClasses} />
            }
          >
            <Link href="/login" className="block w-full">
              Iniciar sesión
            </Link>
          </DropdownItem>

          <DropdownItem
            key="registro"
            startContent={<UserPlusIcon className={iconClasses} />}
          >
            <Link href="/register" className="block w-full">
              Registrarte
            </Link>
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default UserActions;
