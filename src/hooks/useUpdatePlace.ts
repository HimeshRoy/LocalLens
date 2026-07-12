import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, type CreatePlacePayload } from "../api/place.api";

export const useUpdatePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      placeId,
      payload,
    }: {
      placeId: string;
      payload: Partial<CreatePlacePayload>;
    }) => placeApi.update(placeId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-places"],
      });

      queryClient.invalidateQueries({
        queryKey: ["place", variables.placeId],
      });

      queryClient.invalidateQueries({
        queryKey: ["places"],
      });
    },
  });
};
