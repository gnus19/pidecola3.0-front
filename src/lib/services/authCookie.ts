import { cookies } from "next/headers";

export function setAuthCookie(
  res: Response | null,
  payload: { data: { token: string } },
  maxAge = 1000 * 60 * 60 * 24 * 30
) {
  if (res !== null && res?.status !== 200) return;
  cookies().set("auth_token", payload.data.token, {
    maxAge,
  });
}

export function getAuthCookie() {
  return cookies().get("auth_token");
}
