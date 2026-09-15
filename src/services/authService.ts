// src/services/authService.ts
import apiClient from "./apiClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/login", payload);
  return data;
}

export function logout() {
  localStorage.removeItem("accessToken");
}
