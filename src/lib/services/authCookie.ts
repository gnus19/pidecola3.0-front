import { cookies } from "next/headers";

export function setAuthCookies(
  res: Response | null,
  payload: { refresh: string; access: string },
  maxAge = 1000 * 60 * 60 * 24 * 30,
) {
  if (res !== null && res?.status !== 200 && res?.status !== 201) return;
  cookies().set("refresh_token", payload.refresh, {
    maxAge,
  });
  cookies().set("access_token", payload.access, {
    maxAge,
  });
}

export function getAuthCookies() {
  const refresh = cookies().get("refresh_token")?.value;
  const access = cookies().get("access_token")?.value;
  return { refresh, access };
}
