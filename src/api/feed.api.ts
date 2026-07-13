import api from "./axios";

export const feedApi = {
  getFeed: async (
    latitude?: number,
    longitude?: number,
    page = 1,
    limit = 10,
  ) => {
    const response = await api.get("/feed", {
      params: {
        latitude,
        longitude,
        page,
        limit,
      },
    });

    return response.data;
  },
};