import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const categoryApi = {
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get<ApiResponse<Category[]>>(
      "/categories"
    );

    return response.data;
  },
};