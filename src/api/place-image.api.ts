import api from "./axios";

export const placeImageApi = {
  upload: async (
    placeId: string,
    files: File[]
  ) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await api.post(
      `/places/${placeId}/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};