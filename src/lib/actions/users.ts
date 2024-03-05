"use server";

import getApiToken from "../services/apiKey";
import { setAuthCookie, getAuthCookie } from "../services/authCookie";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(_currentState: unknown, formData: FormData) {
  const req = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const token = getApiToken();
  const res = await fetch(`${SERVER}/login`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  setAuthCookie(res, result);
  return { status: res.status, message: result.message };
}

export async function logoutUser() {
  setAuthCookie(null, { data: { token: "" } }, 0);
}

export async function registerUser(_currentState: unknown, formData: FormData) {
  const req = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
  };
  const token = getApiToken();
  const res = await fetch(`${SERVER}/users`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  setAuthCookie(res, result);
  return { status: res.status, message: result.message };
}

export async function getUserEmail() {
  const cookie = getAuthCookie();
  if (!cookie) return;

  const token = cookie.value;

  const res = await fetch(`${SERVER}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (res.status === 200) return { email: result.data.email };
}
