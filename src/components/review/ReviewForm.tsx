import { useState } from "react";
import { Star } from "lucide-react";
import { useCreateReview } from "../../hooks/useCreateReview";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth.store";
import { useLocation, useNavigate } from "react-router-dom";

interface ReviewFormProps {
  placeId: string;
}

const ReviewForm = ({ placeId }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const createReviewMutation = useCreateReview();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Write a Review</h2>

      <p className="mt-2 text-zinc-500">
        Share your experience with other LocalLens users.
      </p>

      <div className="mt-6 flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            title="button"
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition hover:scale-125"
          >
            <Star
              size={34}
              className={`${
                star <= (hoverRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-zinc-300"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={5}
        placeholder="Tell others about your experience..."
        className="mt-6 w-full rounded-2xl border border-zinc-200 p-4 outline-none transition focus:border-blue-500"
      />

      <button
        type="button"
        disabled={rating === 0 || createReviewMutation.isPending}
        onClick={async () => {
          if (!isAuthenticated) {
            navigate("/login", {
              state: {
                from: location,
              },
            });

            return;
          }
          try {
            await createReviewMutation.mutateAsync({
              placeId,
              rating,
              comment,
            });

            toast.success("Review posted successfully!");

            setRating(0);
            setHoverRating(0);
            setComment("");
          } catch (error: any) {
            toast.error(
              error.response?.data?.message ?? "Failed to post review.",
            );
          }
        }}
        className="mt-6 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        {createReviewMutation.isPending ? "Posting..." : "Post Review"}
      </button>
    </div>
  );
};

export default ReviewForm;
