import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import UserBadge from "../common/UserBadge";

interface RecentReviewsTableProps {
  reviews: any[];
}

const RecentReviewsTable = ({ reviews }: RecentReviewsTableProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-lg font-semibold">Recent Reviews</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr className="text-left text-sm text-zinc-500">
              <th className="px-6 py-4">User</th>

              <th className="px-6 py-4">Place</th>

              <th className="px-6 py-4">Rating</th>

              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr
                key={review.id}
                className="border-t border-zinc-100 hover:bg-zinc-50"
              >
                <td className="px-6 py-4">
                  <UserBadge
                    fullName={review.user.fullName}
                    isVerified={false}
                  />

                  <p className="text-sm text-zinc-500">
                    @{review.user.username}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <Link
                    to={`/places/${review.place.slug}`}
                    className="font-medium hover:text-blue-600"
                  >
                    {review.place.name}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span>{review.rating}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-500">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReviewsTable;
