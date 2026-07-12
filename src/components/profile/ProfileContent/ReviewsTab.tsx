import { Star } from "lucide-react";
import { useMyReviews } from "../../../hooks/useMyReviews";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteReview } from "../../../hooks/useDeleteReview";
import { useUpdateReview } from "../../../hooks/useUpdateReview";
import { Link } from "react-router-dom";

interface ReviewsTabProps {
  reviews?: any[];
  isOwner?: boolean;
}

const ReviewsTab = ({ reviews, isOwner = true }: ReviewsTabProps) => {
  const { data: reviewsData } = useMyReviews(isOwner);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const deleteReview = useDeleteReview();
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const [editRating, setEditRating] = useState(0);

  const [editComment, setEditComment] = useState("");
  const updateReview = useUpdateReview();
  const reviewList = isOwner ? (reviewsData?.data ?? []) : (reviews ?? []);

  if (!reviewList.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5">
      {reviewList.map((review: any) => (
        <div
          key={review.id}
          className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <Link to={`/places/${review.place.slug}`}>
              <img
                src={
                  review.place.coverImage ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={review.place.name}
                className="h-24 w-24 rounded-2xl object-cover transition hover:scale-105"
              />
            </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Link
                  to={`/places/${review.place.slug}`}
                  className="text-lg font-semibold hover:text-blue-600"
                >
                  {review.place.name}
                </Link>

                <span className="font-semibold text-amber-500 flex items-center gap-1">
                  <Star className="fill-amber-500" size={15} /> {review.rating}
                </span>
              </div>

              <p className="text-sm text-zinc-500">{review.place.city}</p>

              {editingReviewId === review.id ? (
                <div className="mt-4 space-y-4">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
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
                    rows={4}
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 p-3 outline-none focus:border-blue-500"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={async () => {
                        try {
                          await updateReview.mutateAsync({
                            reviewId: review.id,
                            rating: editRating,
                            comment: editComment,
                          });

                          toast.success("Review updated");
                          setEditingReviewId(null);
                          setOpenMenu(null);
                        } catch (error: any) {
                          toast.error(
                            error.response?.data?.message ??
                              "Failed to update review.",
                          );
                        }
                      }}
                      className="rounded-xl bg-blue-600 px-5 py-2 text-white"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingReviewId(null)}
                      className="rounded-xl border border-zinc-200 px-5 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                review.comment && (
                  <p className="mt-3 leading-7 text-zinc-700">
                    {review.comment}
                  </p>
                )
              )}

              <p className="text-xs text-zinc-400">
                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() =>
                  setOpenMenu(openMenu === review.id ? null : review.id)
                }
              >
                <MoreVertical size={20} />
              </button>

              {openMenu === review.id && (
                <div className="absolute right-0 top-8 z-20 w-40 rounded-lg border border-zinc-200 bg-white shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingReviewId(review.id);

                      setEditRating(review.rating);

                      setEditComment(review.comment ?? "");

                      setOpenMenu(null);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 hover:bg-zinc-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      const confirmed = window.confirm(
                        "Are you sure you want to delete this review?",
                      );

                      if (!confirmed) return;

                      try {
                        await deleteReview.mutateAsync(review.id);

                        toast.success("Review deleted");

                        setOpenMenu(null);
                      } catch (error: any) {
                        toast.error(
                          error.response?.data?.message ??
                            "Something went wrong.",
                        );
                      }
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTab;
