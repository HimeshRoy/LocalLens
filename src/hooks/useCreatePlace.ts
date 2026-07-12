import { useMutation } from "@tanstack/react-query";
import { placeApi } from "../api/place.api";

export const useCreatePlace = () => {
  return useMutation({
    mutationFn: placeApi.create,
  });
};