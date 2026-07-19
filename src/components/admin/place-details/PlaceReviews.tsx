import type { AdminPlaceDetails } from "../../../api/admin.api";

interface PlaceReviewsProps {
  place: AdminPlaceDetails;
}

const PlaceReviews = ({ place }: PlaceReviewsProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-zinc-900">
        Reviews
      </h2>

      <div>{place.reviews.length === 0 ? (
  <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
    No reviews yet.
  </div>
) : (
  <div className="space-y-4 grid grid-cols-3">
    {place.reviews.map((review) => (
      <div
        key={review.id}
        className="rounded-2xl border border-zinc-200 p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              {review.user.fullName}
            </h3>

            <p className="text-sm text-zinc-500">
              @{review.user.username}
            </p>
          </div>

          <div className="text-lg font-semibold">
            ⭐ {review.rating}
          </div>
        </div>

        <p className="mt-3 text-zinc-700">
          {review.comment || "No comment provided."}
        </p>

        <p className="mt-3 text-sm text-zinc-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    ))}
  </div>
)}</div>
    </div>
  );
};

export default PlaceReviews;