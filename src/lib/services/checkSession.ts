import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

export async function checkSession(authCookie: RequestCookie | undefined) {
  if (!authCookie) return false;
  const token = authCookie.value;
  const res = await fetch(`${SERVER}/session`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = await res.json();

  if (res.status === 200) {
    // Resets session token
    const response = NextResponse.next();
    response.cookies.set("auth_token", data.token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return true;
  }

  return false;
}
