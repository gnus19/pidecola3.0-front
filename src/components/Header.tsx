"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import ProfileAvatar from "./ProfileAvatar";
import { useEffect, useState } from "react";

const Header = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [isTop]);

  return (
    <header
      className={`z-50 sticky top-0 py-2 flex justify-between items-center w-screen bg-white dark:bg-gray-800 transition ease-in-out duration-300 ${
        isTop
          ? "border-b border-slate-200 dark:border-slate-600"
          : "shadow-md backdrop-blur-sm bg-gray-200/30 dark:bg-gray-900"
      }`}
    >
      <Link href={"/"} className="mx-auto text-blue-600">
        <Image src={logo} alt="Logo del PideCola" height={40} width={40} />
      </Link>

      <ProfileAvatar className="absolute top-0 bottom-0 my-auto right-2 sm:right-4 md:right-16 xl:right-20" />
    </header>
  );
};

export default Header;
