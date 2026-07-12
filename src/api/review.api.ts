import api from "./axios";
import type { ApiResponse } from "../types/api.types";

export interface CreateReviewPayload {
  placeId: string;
  rating: number;
  comment?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;

  createdAt: string;

  user: {
    id: string;
    fullName: string;
    username: string;
  };
}

export interface PlaceReviewsResponse {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export const reviewApi = {
  create: async (payload: CreateReviewPayload) => {
    const response = await api.post<ApiResponse<Review>>("/reviews", payload);

    return response.data;
  },

  getPlaceReviews: async (placeId: string) => {
    const response = await api.get<ApiResponse<PlaceReviewsResponse>>(
      `/reviews/place/${placeId}`,
    );

    return response.data;
  },

  update: async (
  reviewId: string,
  payload: {
    rating?: number;
    comment?: string;
  }
) => {
  const response = await api.patch<ApiResponse<Review>>(
    `/reviews/${reviewId}`,
    payload
  );

  return response.data;
},

remove: async (reviewId: string) => {
  const response = await api.delete<ApiResponse<null>>(
    `/reviews/${reviewId}`
  );

  return response.data;
},
};
