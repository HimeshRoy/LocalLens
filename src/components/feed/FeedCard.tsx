import FeedHeader from "./FeedHeader";
import FeedCarousel from "./FeedCarousel";
import FeedActions from "./FeedActions";
import FeedContent from "./FeedContent";
import { Link } from "react-router-dom";
import { useAddFavorite } from "../../hooks/useAddFavorite";
import { useRemoveFavorite } from "../../hooks/useRemoveFavorite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CollectionModal from "../collection/CollectionModal";
import { sharePlace } from "../../utils/sharePlace";

interface FeedCardProps {
  place: any;
}

const FeedCard = ({ place }: FeedCardProps) => {
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const navigate = useNavigate();
  const [openCollection, setOpenCollection] = useState<any>(null);

  const handleFavorite = async () => {
    try {
      if (place.isFavorite) {
        await removeFavorite.mutateAsync(place.id);

        ("Removed from favorites");
      } else {
        await addFavorite.mutateAsync(place.id);

        ("Added to favorites");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Something went wrong.");
    }
  };
  return (
    <article className="overflow-hidden bg-[var(--color-bg)] border-b border-b-blue-100 pb-10">
      <FeedHeader place={place} />

      <Link to={`/places/${place.slug}`}>
        <FeedCarousel
          images={
            place.images?.length
              ? place.images
              : place.coverImage
                ? [
                    {
                      id: "cover",
                      imageUrl: place.coverImage,
                    },
                  ]
                : []
          }
        />
      </Link>

      <FeedActions
        place={place}
        onFavorite={handleFavorite}
        onReview={() => navigate(`/places/${place.slug}#reviews`)}
        onCollection={() => setOpenCollection(place)}
        onShare={() => sharePlace(place)}
      />

      <FeedContent place={place} />
      {openCollection && (
        <CollectionModal
          placeId={openCollection.id}
          open={true}
          onClose={() => setOpenCollection(null)}
        />
      )}
    </article>
  );
};

export default FeedCard;
