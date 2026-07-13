import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Heart } from "lucide-react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

interface FeedCarouselProps {
  place: any;

  images: {
    id: string;
    imageUrl: string;
  }[];

  onFavorite?: () => void;
}

const FeedCarousel = ({ place, images, onFavorite }: FeedCarouselProps) => {
  const [showHeart, setShowHeart] = useState(false);
  const navigate = useNavigate();
  const lastTap = useRef(0);

  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = () => {
    const now = Date.now();

    if (now - lastTap.current < 300) {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
      }

      setShowHeart(true);

      if (!place.isFavorite) {
        onFavorite?.();
      }

      setTimeout(() => {
        setShowHeart(false);
      }, 700);

      lastTap.current = 0;

      return;
    }

    lastTap.current = now;

    tapTimeout.current = setTimeout(() => {
      navigate(`/places/${place.slug}`);
    }, 300);
  };

  if (!images.length) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center bg-zinc-100 text-zinc-400">
        No Photos
      </div>
    );
  }

  return (
    <Swiper
      modules={[Pagination]}
      pagination={images.length > 1 ? { clickable: true } : false}
      className="aspect-[4/3] w-full"
      onClick={handleTap}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <img
            src={image.imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      ))}
      {showHeart && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-50">
          <Heart
            className="h-24 w-24 animate-heart-pop fill-red-500 text-red-500 drop-shadow-xl"
            strokeWidth={1.5}
          />
        </div>
      )}
    </Swiper>
  );
};

export default FeedCarousel;
