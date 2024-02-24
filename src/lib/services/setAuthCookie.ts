import { cookies } from "next/headers";

export default function setAuthCookie(
  res: Response | null,
  payload: { data: { token: string } },
  maxAge = 1000 * 60 * 60 * 24 * 30
) {
  if (res !== null && res?.status !== 200) return;
  cookies().set("auth_token", payload.data.token, {
    maxAge,
  });
}
