import { apiClient } from "../lib/apiClient";
import type { LoginResponse } from "../types/auth";

type LoginRequest = {
  email: string;
  password: string;
};

type SignupRequest = {
  email: string;
  password: string;
};

export async function loginApi(data: LoginRequest) {
  const res = await apiClient.post<LoginResponse>("/auth/login", data);
  return res.data;
}

export async function signupApi(data: SignupRequest) {
  const res = await apiClient.post<LoginResponse>("/auth/signup", data);
  return res.data;
}

export async function meApi() {
  const res = await apiClient.get<LoginResponse["user"]>("/auth/me");
  return res.data;
}