"use client";

import { logoutUser } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    logoutUser();
    router.push("/login");
  }, []);
}
