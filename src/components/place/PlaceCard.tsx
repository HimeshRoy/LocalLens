import { Heart, MapPin, Verified } from "lucide-react";
import type { Place } from "../../types/place.types";
import PostHeader from "./PostHeader";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { useAddFavorite } from "../../hooks/useAddFavorite";
import { useRemoveFavorite } from "../../hooks/useRemoveFavorite";
import { toast } from "react-toastify";

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data: favoritesData } = useFavorites();

  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite =
    favoritesData?.data?.some((favorite) => favorite.place.id === place.id) ??
    false;
  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mb-8">
        <PostHeader
          fullName={place.createdBy.fullName}
          username={place.createdBy.username}
          createdAt={place.createdAt}
        />
        <Link to={`/places/${place.slug}`}>
          <div className="group relative overflow-hidden">
            <img
              src={
                place.coverImage || "https://placehold.co/600x400?text=No+Image"
              }
              alt={place.name}
              className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur">
                {place.priceRange}
              </span>
            </div>

            <button
              title="Favorite"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!isAuthenticated) {
                  navigate("/login", {
                    state: {
                      from: location,
                    },
                  });

                  return;
                }

                try {
                  if (isFavorite) {
                    await removeFavorite.mutateAsync(place.id);

                    toast.success("Removed from favorites");
                  } else {
                    await addFavorite.mutateAsync(place.id);

                    toast.success("Added to favorites");
                  }
                } catch (error: any) {
                  toast.error(
                    error.response?.data?.message ?? "Something went wrong.",
                  );
                }
              }}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-2 backdrop-blur transition hover:scale-110"
            >
              <Heart
                size={20}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-zinc-700"
                }
              />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h2 className="text-2xl font-bold flex gap-1 items-center">
                {place.name}{" "}
                {place.isVerified && (
                  <span>
                    <Verified
                      size={20}
                      className="fill-emerald-500 text-emerald-100"
                    />
                  </span>
                )}
              </h2>

              <div className="mt-1 flex items-center gap-2 text-sm">
                <MapPin size={16} />

                <span>
                  {place.city}, {place.state}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PlaceCard;
