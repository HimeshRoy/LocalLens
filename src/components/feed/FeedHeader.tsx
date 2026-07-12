import { Link } from "react-router-dom";
import { MapPin, MoreHorizontal, Verified } from "lucide-react";

interface FeedHeaderProps {
  place: any;
}

const FeedHeader = ({ place }: FeedHeaderProps) => {
  return (
    <div className="flex items-start justify-between px-5 pt-5 pb-3">
      <div className="flex gap-3">
        <Link to={`/@${place.createdBy.username}`}>
          <img
            src={
              place.createdBy.avatar ??
              "https://placehold.co/100x100?text=User"
            }
            alt={place.createdBy.fullName}
            className="h-12 w-12 rounded-full object-cover"
          />
        </Link>

        <div>
          <div className="flex items-center gap-1">
            <Link
              to={`users/${place.createdBy.username}`}
              className="font-semibold hover:text-blue-600"
            >
              {place.createdBy.username}
            </Link>

            {place.createdBy.isVerified && (
              <Verified
                size={20}
                className="fill-blue-500 text-white font-light"
              />
            )}
          </div>

          <Link
            to={`/places/${place.slug}`}
            className="block text-sm font-medium text-zinc-700 hover:text-blue-600"
          >
            {place.name}
          </Link>

          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <MapPin size={12} />

            <span>
              {place.city}, {place.state}
            </span>
          </div>
        </div>
      </div>

      <button className="rounded-full p-2 transition hover:bg-zinc-100">
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
};

export default FeedHeader;