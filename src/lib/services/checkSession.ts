import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

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

  const result = await res.json();
  if (res.status === 200) return true;

  return false;
}
