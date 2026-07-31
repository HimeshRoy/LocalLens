import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import UserBadge from "../common/UserBadge";
import { formatDistanceToNow } from "date-fns";

interface FeedHeaderProps {
  place: any;
}

const FeedHeader = ({ place }: FeedHeaderProps) => {
  return (
    <div className="flex items-start justify-between px-5 pt-5 pb-3">
      <div className="flex gap-3">
        <Link to={`/users/${place.createdBy.username}`}>
          <img
            src={
              place.createdBy.avatar ?? "https://placehold.co/100x100?text=User"
            }
            alt={place.createdBy.fullName}
            className="h-12 w-12 rounded-full object-cover"
          />
        </Link>

        <div>
          <div className="flex items-center gap-1">
            <Link
              to={`/users/${place.createdBy.username}`}
              className="font-semibold hover:text-blue-600"
            >
              <UserBadge
                fullName={place.createdBy.fullName}
                isVerified={place.createdBy.isVerified}
              />
            </Link>
          </div>

          <Link
            to={`/places/${place.slug}`}
            className="block text-sm font-medium text-zinc-700 hover:text-blue-600"
          >
            {place.name}
          </Link>

          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <MapPin size={12} />

            <span className="flex gap-2">
              {place.city}, {place.state}
              {place.distance != null && (
                <>
                  {" "}
                  •{" "}
                  {place.distance < 1
                    ? `${Math.round(place.distance * 1000)} m`
                    : `${place.distance.toFixed(1)} km`}
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs font-medium text-zinc-500 whitespace-nowrap">
        {formatDistanceToNow(new Date(place.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
};

export default FeedHeader;
