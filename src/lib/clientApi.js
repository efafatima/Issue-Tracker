"use client";

import { browserSupabase } from "@/lib/supabaseClient";

export const supabase = browserSupabase();

export function clearStoredAuthSession() {
  if (typeof window === "undefined") return;
  Object.keys(window.localStorage)
    .filter((key) => key.startsWith("sb-") && key.endsWith("-auth-token"))
    .forEach((key) => window.localStorage.removeItem(key));
}

export async function getAccessToken() {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    return sessionData.session?.access_token || "";
  } catch (error) {
    clearStoredAuthSession();
    return "";
  }
}

export async function api(path, options = {}) {
  const token = await getAccessToken();
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  const payload = await response.json();
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || "Request failed");
  }
  return payload.data;
}
