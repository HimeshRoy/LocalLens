import { useMyFavorites } from "../../../hooks/useMyFavorites";
import { Heart, Star } from "lucide-react";
import { toast } from "react-toastify";
import { useAddFavorite } from "../../../hooks/useAddFavorite";
import { useRemoveFavorite } from "../../../hooks/useRemoveFavorite";

const SavedTab = () => {
  const { data, isLoading } = useMyFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  if (isLoading) {
    return (
      <div className="py-10 text-center text-zinc-500">
        Loading saved places...
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
        No saved places yet.
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      {data.data.map((favorite: any) => (
        <div
          key={favorite.place.id}
          className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white clay-sm transition hover:shadow-md"
        >
          <button
            onClick={async () => {
              try {
                await removeFavorite.mutateAsync(favorite.place.id);

                toast.success("Removed from favorites");
              } catch (error: any) {
                toast.error(
                  error.response?.data?.message ?? "Something went wrong.",
                );
              }
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow backdrop-blur transition hover:scale-110"
          >
            <Heart size={20} className="fill-red-500 text-red-500" />
          </button>

          <img
            src={
              favorite.place.coverImage ||
              "https://placehold.co/600x400?text=No+Image"
            }
            alt={favorite.place.name}
            className="h-25 w-full object-cover"
          />

          <div className="p-5">
            <h2 className="text-lg font-semibold">{favorite.place.name}</h2>

            <p className="text-sm text-zinc-500">{favorite.place.city}</p>

            <div className="mt-2 flex items-center justify-between">
              <span className="font-medium text-amber-500 flex items-center gap-2">
                <Star className="fill-amber-500" size={20} />{" "}
                {favorite.place.averageRating ?? "New"}
              </span>

              <span className="text-sm text-zinc-400">
                {favorite.place.category?.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedTab;
