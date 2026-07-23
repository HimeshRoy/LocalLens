import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

interface FeedActionsProps {
  place: any;
  onFavorite?: () => void;
  onReview?: () => void;
  onShare?: () => void;
  onCollection?: () => void;
}

const FeedActions = ({
  place,
  onFavorite,
  onReview,
  onShare,
  onCollection,
}: FeedActionsProps) => {
  return (
    <div className="px-4 py-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 -ml-2">
          <button onClick={onFavorite} className="p-2 transition-transform active:scale-75">
            <Heart
              size={26}
              strokeWidth={1.5}
              className={place.isFavorite ? "fill-red-500 text-red-500" : "text-black"}
            />
          </button>

          <button onClick={onReview} className="p-2 transition-transform active:scale-75">
            <MessageCircle size={25} strokeWidth={1.5} className="text-black" />
          </button>

          <button onClick={onShare} className="p-2 transition-transform active:scale-75">
            <Send size={26} strokeWidth={1.5} className="text-black" />
          </button>
        </div>

        <button onClick={onCollection} className="p-2 -mr-2 transition-transform active:scale-75">
          <Bookmark
            size={26}
            strokeWidth={1.5}
            className={place.isSaved ? "fill-amber-300 text-amber-300" : "text-black"}
          />
        </button>
      </div>

      <div>
        <p className="text-sm font-semibold text-black">
          {place.totalReviews ?? 0} reviews • {place.averageRating ?? "New"} average
        </p>
      </div>
    </div>
  );
};

export default FeedActions;