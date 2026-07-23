import { useMyFavorites } from "../../../hooks/useMyFavorites";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useRemoveFavorite } from "../../../hooks/useRemoveFavorite";
import { Link } from "react-router-dom";

const SavedTab = () => {
  const { data, isLoading } = useMyFavorites();
  const removeFavorite = useRemoveFavorite();

  if (isLoading) {
    return <div className="py-10 text-center text-zinc-500">Loading...</div>;
  }

  if (!data?.data?.length) {
    return <div className="py-20 text-center text-zinc-500">No saved places yet.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-1 mt-4">
      {data.data.map((favorite: any) => (
        <div
          key={favorite.place.id}
          className="group relative aspect-square bg-zinc-100"
        >
          <Link to={`/places/${favorite.place.slug}`} className="block h-full w-full">
            <img
              src={
                favorite.place.coverImage ||
                "https://placehold.co/400x400?text=No+Image"
              }
              alt={favorite.place.name}
              className="h-full w-full object-cover rounded-2xl"
            />
          </Link>

          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                await removeFavorite.mutateAsync(favorite.place.id);
                toast.success("Removed from favorites");
              } catch (error: any) {
                toast.error(error.response?.data?.message ?? "Something went wrong.");
              }
            }}
            className="absolute right-2 top-2 z-10 p-1 drop-shadow-md transition active:scale-75 md:opacity-0 md:group-hover:opacity-100"
          >
            <Heart size={20} className={"fill-red-500 text-red-500"}/>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedTab;