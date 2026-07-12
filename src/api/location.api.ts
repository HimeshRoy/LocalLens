import api from "./axios";

export interface ReverseGeocodeResponse {
  city: string;
  state: string;
  country: string;
}

export const locationApi = {
  reverseGeocode: async (
    latitude: number,
    longitude: number,
  ): Promise<ReverseGeocodeResponse> => {
    const response = await api.get<{
      success: boolean;
      data: ReverseGeocodeResponse;
    }>("/location/reverse", {
      params: {
        lat: latitude,
        lng: longitude,
      },
    });

    return response.data.data;
  },

  search: async (query: string) => {
    const response = await api.get("/location/search", {
      params: {
        q: query,
      },
    });

    return response.data;
  },
};
