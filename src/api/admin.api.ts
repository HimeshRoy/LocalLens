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

export interface AdminPlaceDetails extends AdminPlace {
  description: string | null;

  address: string;
  country: string;

  latitude: number;
  longitude: number;

  phone: string | null;
  website: string | null;

  openingHours: string | null;

  priceRange: string | null;

  images: {
    id: string;
    imageUrl: string;
  }[];

  latestReviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;

    user: {
      id: string;
      fullName: string;
      username: string;
    };
  }[];
}

export interface DashboardData {
  statistics: DashboardStatistics;
  recentUsers: any[];
  recentPlaces: any[];
  recentReviews: any[];
}

export interface UsersStatistics {
  total: number;
  verified: number;
  admins: number;
  suspended: number;
}

export interface AdminUsersResponse {
  statistics: UsersStatistics;
  users: AdminUser[];
}

export interface AdminUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string | null;

  role: "USER" | "BUSINESS" | "ADMIN";

  isVerified: boolean;
  isActive: boolean;

  createdAt: string;

  _count: {
    reviews: number;
    places: number;
    favorites: number;
    collections: number;
  };
}

export interface AdminPlace {
  id: string;
  coverImage: string | null;
  name: string;
  city: string;
  state: string;

  isActive: boolean;
  isVerified: boolean;

  averageRating: number;
  totalReviews: number;

  createdAt: string;

  category: {
    id: string;
    name: string;
    icon: string;
  };

  createdBy: {
    id: string;
    fullName: string;
    username: string;
  };

  _count: {
    reviews: number;
    images: number;
  };
}

export interface AdminPlaceDetails extends AdminPlace {
  description: string | null;

  address: string;
  country: string;

  latitude: number;
  longitude: number;

  phone: string | null;
  website: string | null;

  openingHours: string | null;

  priceRange: string | null;

  images: {
    id: string;
    imageUrl: string;
  }[];

  reviews: {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    username: string;
  };
}[];
}

export const adminApi = {
  getDashboard: async () => {
    const response =
      await api.get<ApiResponse<DashboardData>>("/admin/dashboard");

    return response.data;
  },

  getUsers: async (params?: {
    search?: string;
    role?: "USER" | "BUSINESS" | "ADMIN";
    status?: "ACTIVE" | "SUSPENDED";
    verified?: "true" | "false";
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get<ApiResponse<AdminUsersResponse>>(
      "/admin/users",
      {
        params,
      },
    );

    return response.data;
  },

  updateUserStatus: async (userId: string, isActive: boolean) => {
    const response = await api.patch<
      ApiResponse<{
        id: string;
        fullName: string;
        username: string;
        isActive: boolean;
      }>
    >(`/admin/users/${userId}/status`, {
      isActive,
    });

    return response.data;
  },

  updateUserVerification: async (userId: string, isVerified: boolean) => {
    const response = await api.patch<
      ApiResponse<{
        id: string;
        fullName: string;
        username: string;
        isVerified: boolean;
      }>
    >(`/admin/users/${userId}/verification`, {
      isVerified,
    });

    return response.data;
  },

  updateUserRole: async (id: string, role: "USER" | "BUSINESS" | "ADMIN") => {
    const { data } = await api.patch(`/admin/users/${id}/role`, { role });

    return data;
  },

  deleteUser: async (id: string) => {
    const { data } = await api.delete(`/admin/users/${id}`);

    return data;
  },

  getPlaces: async (params?: {
    search?: string;
    categoryId?: string;
    status?: string;
    isVerified?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await api.get("/admin/places", {
      params,
    });

    return data.data;
  },

  verifyPlace: async (id: string, isVerified: boolean) => {
    const { data } = await api.patch(`/admin/places/${id}/verification`, {
      isVerified,
    });

    return data.data;
  },

  updatePlaceStatus: async (id: string, isActive: boolean) => {
    const { data } = await api.patch(`/admin/places/${id}/status`, {
      isActive,
    });

    return data.data;
  },

  deletePlace: async (id: string) => {
    const { data } = await api.delete(`/admin/places/${id}`);

    return data.data;
  },

  getPlaceById: async (id: string): Promise<AdminPlaceDetails> => {
    const { data } = await api.get<ApiResponse<AdminPlaceDetails>>(
      `/admin/places/${id}`,
    );

    return data.data;
  },
};
