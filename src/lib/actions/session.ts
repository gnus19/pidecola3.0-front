import { jwtDecode } from "jwt-decode";
import { getAuthCookies, setAuthCookies } from "../services/authCookie";
import dayjs from "dayjs";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

const isAccessTokenExpired = () => {
  const { access } = getAuthCookies();
  if (!access) return true;
  const data = jwtDecode(access);
  if (!data.exp) return true;
  return dayjs.unix(data.exp).diff(dayjs()) < 1;
}

const refreshTokens = async () => {
  const { refresh } = getAuthCookies();
  if (!refresh) return;
  const res = await fetch(`${SERVER}/auth/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refresh: refresh }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) return;
  const result = await res.json();
  setAuthCookies(res, result);
};

export { isAccessTokenExpired, refreshTokens };
