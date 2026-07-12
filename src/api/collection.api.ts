import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface Collection {
  id: string;
  name: string;
  emoji?: string;
  description?: string;
  isPrivate: boolean;

  placesCount: number;

  coverImage?: string;
}

export const collectionApi = {
  getMine: async () => {
    const response =
      await api.get<ApiResponse<Collection[]>>("/collections/my");

    return response.data;
  },

  create: async (payload: {
    name: string;
    emoji?: string;
    description?: string;
    isPrivate?: boolean;
  }) => {
    const response = await api.post<ApiResponse<Collection>>(
      "/collections",
      payload,
    );

    return response.data;
  },

  addPlace: async (collectionId: string, placeId: string) => {
    const response = await api.post(`/collections/${collectionId}/places`, {
      placeId,
    });

    return response.data;
  },

  getById: async (collectionId: string) => {
    const response = await api.get(`/collections/${collectionId}`);

    return response.data;
  },

  update: async (
    collectionId: string,
    payload: {
      name?: string;
      emoji?: string;
      description?: string;
      isPrivate?: boolean;
    },
  ) => {
    const response = await api.patch(`/collections/${collectionId}`, payload);

    return response.data;
  },

  remove: async (collectionId: string) => {
    const response = await api.delete(`/collections/${collectionId}`);

    return response.data;
  },

  removePlace: async (collectionId: string, placeId: string) => {
    const response = await api.delete(
      `/collections/${collectionId}/places/${placeId}`,
    );

    return response.data;
  },
};
