import type { AdminPlaceDetails } from "../../../api/admin.api";

interface PlaceGalleryProps {
  place: AdminPlaceDetails;
}

const PlaceGallery = ({ place }: PlaceGalleryProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-zinc-900">
        Gallery
      </h2>

      <div>{place.images.length === 0 ? (
  <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
    No images uploaded yet.
  </div>
) : (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {place.images.map((image) => (
      <div
        key={image.id}
        className="overflow-hidden rounded-2xl border border-zinc-200"
      >
        <img
          src={image.imageUrl}
          alt={place.name}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    ))}
  </div>
)}</div>
    </div>
  );
};

export default PlaceGallery;