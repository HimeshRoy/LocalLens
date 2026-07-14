import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface DashboardStatistics {
    fullName: string;
  users: number;
  businesses: number;
  places: number;
  reviews: number;
  favorites: number;
  collections: number;
  categories: number;
  tags: number;
  verifiedPlaces: number;
  pendingClaims: number;
}

export interface DashboardData {
  statistics: DashboardStatistics;
  recentUsers: any[];
  recentPlaces: any[];
  recentReviews: any[];
}

export const adminApi = {
  getDashboard: async () => {
    const response = await api.get<ApiResponse<DashboardData>>(
      "/admin/dashboard",
    );

    return response.data;
  },
};