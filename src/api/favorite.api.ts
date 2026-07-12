import api from "./axios";
import type { ApiResponse } from "../types/api.types";
import type { Place } from "../types/place.types";

export interface Favorite {
  id: string;
  place: Place;
  createdAt: string;
}

export const favoriteApi = {
  getMine: async () => {
    const response = await api.get<ApiResponse<Favorite[]>>("/favorites");

    return response.data;
  },

  create: async (placeId: string) => {
    const response = await api.post<ApiResponse<Favorite>>("/favorites", {
      placeId,
    });

    return response.data;
  },

  remove: async (placeId: string) => {
    const response = await api.delete<ApiResponse<null>>(
      `/favorites/${placeId}`
    );

    return response.data;
  },
};