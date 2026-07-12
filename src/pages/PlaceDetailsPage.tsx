import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { usePlace } from "../hooks/usePlace";
import {
  Star,
  Verified,
  Navigation,
  Phone,
  Globe,
  Clock3,
  Bookmark,
} from "lucide-react";
import ImageCarousel from "../components/place/ImageCarousel";
import { usePlaceReviews } from "../hooks/usePlaceReviews";
import ReviewForm from "../components/review/ReviewForm";
import { useAuthStore } from "../store/auth.store";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { toast } from "react-toastify";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { useAddFavorite } from "../hooks/useAddFavorite";
import { useRemoveFavorite } from "../hooks/useRemoveFavorite";
import { useNavigate, useLocation } from "react-router-dom";
import CollectionModal from "../components/collection/CollectionModal";

const PlaceDetailsPage = () => {
  const { slug } = useParams();

  const user = useAuthStore((state) => state.user);

  const deleteReviewMutation = useDeleteReview();
  const updateReviewMutation = useUpdateReview();

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data: favoritesData } = useFavorites();

  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);

  const { data, isLoading, error } = usePlace(slug);

  const placeId = data?.data?.id;

  const { data: reviewData, isPending: reviewsLoading } =
    usePlaceReviews(placeId);

    useEffect(() => {
  if (location.hash === "#reviews") {
    const section = document.getElementById("reviews");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}, [location]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-6xl animate-pulse px-4 py-6">
          <div className="h-2xl rounded-3xl bg-zinc-200" />

          <div className="mt-8 h-10 w-72 rounded-xl bg-zinc-200" />

          <div className="mt-4 h-5 w-56 rounded-lg bg-zinc-200" />

          <div className="mt-8 flex gap-3">
            <div className="h-10 w-28 rounded-full bg-zinc-200" />
            <div className="h-10 w-32 rounded-full bg-zinc-200" />
            <div className="h-10 w-24 rounded-full bg-zinc-200" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="h-64 rounded-3xl bg-zinc-200" />
            <div className="h-64 rounded-3xl bg-zinc-200" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !data?.data) {
    return (
      <MainLayout>
        <div className="p-10">Place not found.</div>
      </MainLayout>
    );
  }

  const place = data.data;

  const isFavorite =
    favoritesData?.data?.some((favorite) => favorite.place.id === place.id) ??
    false;

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="overflow-hidden rounded-3xl clay">
          <ImageCarousel
            images={
              place.images.length > 0
                ? place.images.map(
                    (image: { imageUrl: string }) => image.imageUrl,
                  )
                : ["https://placehold.co/1200x700?text=No+Image"]
            }
          />
        </div>

        <div className="mt-6">
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold capitalize">{place.name}</h1>

                {place.isVerified && (
                  <span className=" text-emerald-700 text-center flex-col justify-center items-center">
                    <Verified />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-3 flex items-center gap-2 text-zinc-500">
                📍 {place.city}, {place.state}, {place.country}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium">
                  {place.category.icon} {place.category.name}
                </span>

                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium">
                  💰 {place.priceRange}
                </span>

                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium flex items-center gap-2">
                  <Star className="fill-amber-300 outline-amber-300 text-amber-300" />{" "}
                  {place.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 "
          >
            <Navigation size={18} />
            Directions
          </a>

          {place.phone && (
            <a
              href={`tel:${place.phone}`}
              className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 font-medium transition hover:bg-zinc-100"
            >
              <Phone size={18} />
              Call
            </a>
          )}

          {place.website && (
            <a
              href={place.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 font-medium transition hover:bg-zinc-100"
            >
              <Globe size={18} />
              Website
            </a>
          )}

          {place.openingHours && (
            <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 font-medium">
              <Clock3 size={18} />
              {place.openingHours}
            </div>
          )}

          <button
            onClick={async () => {
              if (!isAuthenticated) {
                navigate("/login", {
                  state: { from: location },
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
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 font-medium transition ${
              isFavorite
                ? "bg-red-500 text-white hover:bg-red-600"
                : "border border-zinc-200 bg-white hover:bg-zinc-100"
            }`}
          >
            <Heart
              size={18}
              className={isFavorite ? "fill-white text-white" : "text-zinc-700"}
            />

            {isFavorite ? "Saved" : "Save"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login", {
                  state: { from: location },
                });
                return;
              }

              setCollectionModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 font-medium transition hover:bg-zinc-100 clay"
          >
            <Bookmark className="fill-amber-300 text-amber-300" /> Collection
          </button>
        </div>

        {place.description && (
          <section className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 clay mb-8">
            <h2 className="mb-2 text-xl font-bold">About this Place</h2>

            <p className=" text-zinc-700 whitespace-pre-line leading-7 line-clamp-3">
              {place.description}
            </p>
          </section>
        )}

        <div id="reviews">
          <ReviewForm placeId={place.id} />
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 clay">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Reviews</h2>

            <span className="text-zinc-500">
              {reviewData?.data.totalReviews ?? 0} Reviews
            </span>
          </div>

          {reviewsLoading ? (
            <div className="mt-6 animate-pulse space-y-4">
              <div className="h-5 w-40 rounded bg-zinc-200" />
              <div className="h-20 rounded-2xl bg-zinc-200" />
              <div className="h-20 rounded-2xl bg-zinc-200" />
            </div>
          ) : reviewData?.data.reviews.length ? (
            <div className="mt-6 space-y-6">
              {reviewData.data.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-zinc-100 pb-3 last:border-none"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold">{review.user.fullName}</h5>

                      <p className="text-sm text-zinc-500">
                        @{review.user.username}
                      </p>
                    </div>

                    <div className="text-md">{"⭐".repeat(review.rating)}</div>
                  </div>

                  {editingReviewId === review.id ? (
                    <div className="mt-4 space-y-4">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            title="star"
                            key={star}
                            type="button"
                            onClick={() => setEditRating(star)}
                          >
                            <Star
                              size={24}
                              className={
                                star <= editRating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-zinc-300"
                              }
                            />
                          </button>
                        ))}
                      </div>

                      <textarea
                        title="comment"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-zinc-200 p-3 outline-none focus:border-blue-500"
                      />

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await updateReviewMutation.mutateAsync({
                                reviewId: review.id,
                                rating: editRating,
                                comment: editComment,
                              });

                              toast.success("Review updated successfully.");

                              setEditingReviewId(null);
                            } catch (error: any) {
                              toast.error(
                                error.response?.data?.message ??
                                  "Failed to update review.",
                              );
                            }
                          }}
                          className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingReviewId(null)}
                          className="rounded-xl border border-zinc-200 px-5 py-2 hover:bg-zinc-100"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    review.comment && (
                      <p className="mt-2 leading-7 text-zinc-700">
                        {review.comment}
                      </p>
                    )
                  )}
                  {user?.id === review.user.id && (
                    <div className="flex gap-4 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingReviewId(review.id);
                          setEditRating(review.rating);
                          setEditComment(review.comment ?? "");
                        }}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deleteReviewMutation.isPending}
                        onClick={async () => {
                          const confirmed = window.confirm(
                            "Are you sure you want to delete this review?",
                          );

                          if (!confirmed) return;

                          try {
                            await deleteReviewMutation.mutateAsync(review.id);

                            toast.success("Review deleted successfully.");
                          } catch (error: any) {
                            toast.error(
                              error.response?.data?.message ??
                                "Failed to delete review.",
                            );
                          }
                        }}
                        className="font-medium text-red-600 hover:underline disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-zinc-500">
              No reviews yet. Be the first to review this place.
            </p>
          )}
        </section>
      </div>
      <CollectionModal
        open={collectionModalOpen}
        onClose={() => setCollectionModalOpen(false)}
        placeId={place.id}
      />
    </MainLayout>
  );
};

export default PlaceDetailsPage;
