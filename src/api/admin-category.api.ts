import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  _count: {
    places: number;
  };
}

export const adminCategoryApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<AdminCategory[]>>("/categories");

    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<AdminCategory>>(
      `/categories/${id}`,
    );

    return response.data;
  },

  update: async (
    id: string,
    payload: {
      name: string;
      description: string;
      icon: string;
      isActive: boolean;
    },
  ) => {
    const response = await api.patch(`/categories/${id}`, payload);

    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);

    return response.data;
  },

  create: async (payload: {
    name: string;
    description: string;
    icon: string;
  }) => {
    const response = await api.post("/categories", payload);

    return response.data;
  },
};
