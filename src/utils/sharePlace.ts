import { toast } from "react-toastify";

export const sharePlace = async (place: any) => {
  const url = `${window.location.origin}/places/${place.slug}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: place.name,
        text: `Check out ${place.name} on LocalLens`,
        url,
      });

      return;
    } catch {
      return;
    }
  }

  await navigator.clipboard.writeText(url);

  toast.success("Link copied to clipboard");
};