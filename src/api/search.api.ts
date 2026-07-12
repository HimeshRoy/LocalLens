import api from "./axios";
import type { ApiResponse } from "../types/api.types";
import type { Place } from "../types/place.types";

export const searchApi = {
  searchPlaces: async (query: string) => {
    const response = await api.get<ApiResponse<Place[]>>("/places", {
      params: {
        search: query,
        limit: 20,
      },
    });

    return response.data;
  },
};