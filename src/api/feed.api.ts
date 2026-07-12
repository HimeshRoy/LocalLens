import api from "./axios";

export const feedApi = {
  getFeed: async (
    latitude?: number,
    longitude?: number,
  ) => {
    const response = await api.get("/feed", {
      params: {
        latitude,
        longitude,
      },
    });

    return response.data;
  },
};