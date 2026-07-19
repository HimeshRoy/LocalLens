import type { AdminPlaceDetails } from "../../../api/admin.api";

interface PlaceOverviewProps {
  place: AdminPlaceDetails;
}

const PlaceOverview = ({ place }: PlaceOverviewProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-zinc-900">Overview</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-1 text-sm font-medium text-zinc-500">Description</p>

          <p className="text-zinc-800">
            {place.description || "No description available."}
          </p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-zinc-500">Category</p>

          <p className="text-zinc-800">
            {place.category.icon} {place.category.name}
          </p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-zinc-500">Address</p>

          <p className="text-zinc-800">{place.address}</p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-zinc-500">Price Range</p>

          <p className="text-zinc-800">{place.priceRange ?? "Not specified"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-zinc-500">Phone</p>

          <p className="text-zinc-800">{place.phone || "Not available"}</p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-zinc-500">Website</p>

          {place.website ? (
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          ) : (
            <p className="text-zinc-800">Not available</p>
          )}
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-zinc-500">
            Opening Hours
          </p>

          <p className="text-zinc-800">
            {place.openingHours || "Not available"}
          </p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-zinc-500">Location</p>

          <p className="text-zinc-800">
            {place.city}, {place.state}, {place.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOverview;
