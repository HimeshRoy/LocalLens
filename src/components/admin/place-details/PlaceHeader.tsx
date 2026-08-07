import { Link } from "react-router-dom";
import Avatar from "../../common/Avatar";
import PlaceStatusBadge from "../places/PlaceStatusBadge";
import type { AdminPlaceDetails } from "../../../api/admin.api";

interface PlaceHeaderProps {
  place: AdminPlaceDetails;
}

const PlaceHeader = ({ place }: PlaceHeaderProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <Link
        to="/admin/places"
        className="mb-6 inline-flex text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
      >
        ← Back to Places
      </Link>

      <div className="flex items-start gap-5">
        <Avatar image={place.coverImage} name={place.name} />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-zinc-900">{place.name}</h1>

            <PlaceStatusBadge status={place.status} isActive={place.isActive} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span>
              {place.category.icon} {place.category.name}
            </span>

            <span>⭐ {place.averageRating.toFixed(1)}</span>

            <span>{place._count.reviews} Reviews</span>
          </div>

          <div className="mt-4 text-sm text-zinc-600">
            <p>
              Created by <strong>{place.createdBy.fullName}</strong> (@
              {place.createdBy.username})
            </p>

            <p>{new Date(place.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceHeader;
