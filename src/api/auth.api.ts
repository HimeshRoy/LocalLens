import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  profileImage?: string | null;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  login: async (
    payload: LoginPayload,
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      payload,
    );

    return response.data;
  },

  register: async (
    payload: RegisterPayload,
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      payload,
    );

    return response.data;
  },

  me: async (): Promise<ApiResponse<AuthUser>> => {
    const response = await api.get<ApiResponse<AuthUser>>(
      "/users/me",
    );

    return response.data;
  },

  checkUsername: async (username: string) => {
  const response = await api.get(
    "/auth/check-username",
    {
      params: {
        username,
      },
    },
  );

  return response.data;
},

checkEmail: async (email: string) => {
  const response = await api.get(
    "/auth/check-email",
    {
      params: {
        email,
      },
    },
  );

  return response.data;
},

};
