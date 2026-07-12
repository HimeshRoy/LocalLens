import { Link } from "react-router-dom";
import { MapPin, Star, Verified } from "lucide-react";
import type { Place } from "../../types/place.types";

interface Props {
  place: Place;
}

const SearchResultCard = ({ place }: Props) => {
  return (
    <Link
      to={`/places/${place.slug}`}
      className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-3 transition hover:border-blue-500 hover:shadow-md mb-2"
    >
      <img
        src={place.coverImage ?? "https://placehold.co/120x120?text=No+Image"}
        alt={place.name}
        className="h-24 w-24 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-lg font-semibold">{place.name}</h3>

          {place.isVerified && (
            <Verified size={18} className="fill-emerald-500 text-white" />
          )}
        </div>

        <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
          <MapPin size={15} />
          {place.city}, {place.state}
        </p>

        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            {place.category.icon} {place.category.name}
          </span>

          <span className="flex items-center gap-1">
            <Star size={15} className="fill-yellow-400 text-yellow-400" />

            {place.averageRating ? place.averageRating.toFixed(1) : "New"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
