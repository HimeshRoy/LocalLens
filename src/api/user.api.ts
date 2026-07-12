import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface Profile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  role: string;
  isVerified: boolean;
  createdAt: string;
  isPrivate?: boolean;

  _count: {
    reviews: number;
    favorites: number;
    collections: number;
    places: number;
    businessClaims: number;
  };
}

export const userApi = {
  getMe: async () => {
    const response = await api.get<ApiResponse<Profile>>("/users/me");

    return response.data;
  },

  getMyReviews: async () => {
    const response = await api.get("/users/me/reviews");
    return response.data;
  },

  getMyCollections: async () => {
    const response = await api.get("/users/me/collections");
    return response.data;
  },

  getMyFavorites: async () => {
    const response = await api.get("/users/me/favorites");

    return response.data;
  },

  getMyPlaces: async () => {
    const response = await api.get("/users/me/places");
    return response.data;
  },
  updateMe: async (payload: {
    fullName?: string;
    username?: string;
    bio?: string;
    city?: string;
    country?: string;
    isPrivate: boolean;
  }) => {
    const response = await api.patch("/users/me", payload);

    return response.data;
  },
  uploadAvatar: async (file: File) => {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await api.post("/users/me/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  getPublicProfile : async (username: string) => {
  const response = await api.get(`/users/${username}`);

  return response.data;
},
  
};