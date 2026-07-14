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
    const response = await api.get<ApiResponse<AdminCategory[]>>(
      "/categories",
    );

    return response.data;
  },
};