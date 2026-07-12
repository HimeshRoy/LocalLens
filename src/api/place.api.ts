import api from "./axios";
import type { ApiResponse } from "../types/api.types";
import type { Place } from "../types/place.types";
import type { PriceRange } from "../types/place.types";

export interface CreatePlacePayload {
  name: string;
  description?: string;

  address: string;
  city: string;
  state: string;
  country: string;

  latitude: number;
  longitude: number;

  categoryId: string;

  phone?: string;
  website?: string;
  openingHours?: string;
  priceRange: PriceRange;
  coverImage?: string;
}

export const placeApi = {
  getAll: async (search?: string): Promise<ApiResponse<Place[]>> => {
    const response = await api.get<ApiResponse<Place[]>>("/places", {
      params: {
        search,
      },
    });

    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Place>> => {
    const response = await api.get<ApiResponse<Place>>(`/places/${id}`);

    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/places/slug/${slug}`);

    return response.data;
  },

  getNearby: async (
    latitude: number,
    longitude: number,
    radius = 100,
  ): Promise<ApiResponse<Place[]>> => {
    const response = await api.get<ApiResponse<Place[]>>("/places/nearby", {
      params: {
        latitude,
        longitude,
        radius,
      },
    });

    return response.data;
  },

  create: async (payload: CreatePlacePayload): Promise<ApiResponse<Place>> => {
    const response = await api.post<ApiResponse<Place>>("/places", payload);

    return response.data;
  },

  remove: async (placeId: string) => {
    const response = await api.delete(`/places/${placeId}`);

    return response.data;
  },

  update: async (
    placeId: string,
    payload: Partial<CreatePlacePayload>,
  ): Promise<ApiResponse<Place>> => {
    const response = await api.patch<ApiResponse<Place>>(
      `/places/${placeId}`,
      payload,
    );

    return response.data;
  },
};
