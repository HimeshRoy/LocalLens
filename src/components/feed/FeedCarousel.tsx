import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface FeedCarouselProps {
  images: {
    id: string;
    imageUrl: string;
  }[];
}

const FeedCarousel = ({ images }: FeedCarouselProps) => {
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
    </Swiper>
  );
};

export default FeedCarousel;
