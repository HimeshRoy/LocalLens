import { Heart, Star, Share2, FolderPlus } from "lucide-react";

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
    <div className="space-y-4 px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onFavorite}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <Heart
              size={23}
              className={place.isFavorite ? "fill-red-500 text-red-500" : ""}
            />
          </button>

          <button
            onClick={onReview}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <Star
              size={22}
              className={
                place.isReviewed ? "fill-yellow-400 text-yellow-400" : ""
              }
            />
          </button>

          <button
            onClick={onShare}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <Share2 size={22} />
          </button>
        </div>

        <button
          onClick={onCollection}
          className="rounded-full p-2 transition hover:bg-zinc-100"
        >
          <FolderPlus
            size={22}
            className={place.isSaved ? "fill-blue-500 text-blue-500" : ""}
          />
          
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-zinc-900 flex items-center gap-2">
          <Star className="text-amber-400 fill-amber-400" />{" "}
          {place.averageRating ?? "New"} ({place.totalReviews ?? 0} Reviews)
        </p>
      </div>
    </div>
  );
};

export default FeedActions;
