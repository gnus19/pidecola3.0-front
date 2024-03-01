"use client";

import { logoutUser } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logoutAction = async () => {
      await logoutUser();
      router.push("/login");
    };

    logoutAction();
  }, []);
}
