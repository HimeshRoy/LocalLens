import { Star, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useMyReviews } from "../../../hooks/useMyReviews";
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
    return <div className="py-20 text-center text-zinc-500">No reviews yet.</div>;
  }

  return (
    <div className="flex flex-col mt-4 space-y-1.5">
      {reviewList.map((review: any) => (
        <div key={review.id} className="border-b border-zinc-200 bg-white p-4 rounded-2xl">
          <div className="flex items-start gap-4">
            <Link to={`/places/${review.place.slug}`} className="shrink-0">
              <img
                src={review.place.coverImage || "https://placehold.co/400x400"}
                alt={review.place.name}
                className="h-14 w-14 rounded-full border border-zinc-200 object-cover"
              />
            </Link>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <Link
                  to={`/places/${review.place.slug}`}
                  className="truncate font-semibold text-black"
                >
                  {review.place.name}
                </Link>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star className="fill-amber-400 text-amber-400" size={12} />
                  <span>{review.rating}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 truncate">{review.place.city}</p>

              {editingReviewId === review.id ? (
                <div className="mt-3 space-y-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setEditRating(star)}>
                        <Star
                          size={20}
                          strokeWidth={1.5}
                          className={
                            star <= editRating ? "fill-amber-400 text-amber-400" : "text-zinc-300"
                          }
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={3}
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 p-3 text-sm outline-none focus:border-black"
                  />

                  <div className="flex gap-2">
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
                        } catch (error: any) {
                          toast.error("Failed to update review.");
                        }
                      }}
                      className="rounded-lg bg-black px-4 py-1.5 text-sm font-medium text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingReviewId(null)}
                      className="rounded-lg border border-zinc-200 px-4 py-1.5 text-sm font-medium text-black"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                review.comment && (
                  <p className="mt-2 text-sm text-black leading-relaxed">
                    {review.comment}
                  </p>
                )
              )}

              <p className="mt-2 text-[11px] text-zinc-400">
                {new Date(review.createdAt).toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {isOwner && (
              <div className="relative shrink-0">
                <button onClick={() => setOpenMenu(openMenu === review.id ? null : review.id)}>
                  <MoreVertical size={18} className="text-zinc-400" />
                </button>

                {openMenu === review.id && (
                  <div className="absolute right-0 top-6 z-20 w-32 rounded-lg border border-zinc-200 bg-white shadow-lg overflow-hidden">
                    <button
                      onClick={() => {
                        setEditingReviewId(review.id);
                        setEditRating(review.rating);
                        setEditComment(review.comment ?? "");
                        setOpenMenu(null);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-black hover:bg-zinc-50"
                    >
                      <Pencil size={14} /> Edit
                    </button>

                    <button
                      onClick={async () => {
                        if (!window.confirm("Delete this review?")) return;
                        try {
                          await deleteReview.mutateAsync(review.id);
                          toast.success("Review deleted");
                          setOpenMenu(null);
                        } catch (error: any) {
                          toast.error("Something went wrong.");
                        }
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTab;