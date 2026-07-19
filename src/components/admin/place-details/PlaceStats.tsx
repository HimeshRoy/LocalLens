import { Star } from "lucide-react";
import type { AdminPlaceDetails } from "../../../api/admin.api";

interface PlaceStatsProps {
  place: AdminPlaceDetails;
}

const PlaceStats = ({ place }: PlaceStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">Average Rating</p>

        <h2 className="mt-2 text-3xl font-bold text-zinc-900 flex gap-2 items-center">
          <Star className="text-amber-300 fill-amber-300" />{" "}
          {place.averageRating.toFixed(1)}
        </h2>
      </div>
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">Reviews</p>

        <h2 className="mt-2 text-3xl font-bold text-zinc-900 ">
        {place.totalReviews}
        </h2>
      </div>
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">Images</p>

        <h2 className="mt-2 text-3xl font-bold text-zinc-900">
          {place.images.length}
        </h2>
      </div>
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">Status</p>

        <h2 className="mt-2 text-lg font-bold">
          {place.isVerified ? "Verified" : "Pending"}
        </h2>

        <p
          className={`mt-1 text-sm ${
            place.isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {place.isActive ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};

export default PlaceStats;
