import { useMutation } from "@tanstack/react-query";
import { placeImageApi } from "../api/place-image.api";

export const useUploadPlaceImages = () => {
  return useMutation({
    mutationFn: ({
      placeId,
      files,
    }: {
      placeId: string;
      files: File[];
    }) => placeImageApi.upload(placeId, files),
  });
};