import { useQuery } from "@tanstack/react-query";
import { collectionApi } from "../api/collection.api";

export const useCollections = () => {
  return useQuery({
    queryKey: ["collections"],

    queryFn: collectionApi.getMine,

    staleTime: 1000 * 60 * 5,
  });
};

export const useCollection = (
  collectionId?: string
) => {
  return useQuery({
    queryKey: ["collection", collectionId],

    queryFn: () =>
      collectionApi.getById(collectionId!),

    enabled: !!collectionId,
  });
};