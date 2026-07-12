import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          scrollPrev();
          break;

        case "ArrowRight":
          scrollNext();
          break;

        case "Escape":
          setIsFullscreen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, scrollPrev, scrollNext]);

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div key={image} className="min-w-0 flex-[0_0_100%]">
              <img
                src={image}
                alt=""
                onClick={() => setIsFullscreen(true)}
                className="w-full cursor-zoom-in object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        title="prev"
        type="button"
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur transition hover:bg-white"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        title="next"
        type="button"
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur transition hover:bg-white"
      >
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur">
        {images.map((_, index) => (
          <button
            title="button"
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              selectedIndex === index ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-2 text-sm font-medium text-white backdrop-blur">
        {selectedIndex + 1} / {images.length}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
          <button
            title="close"
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/30"
          >
            <X size={24} />
          </button>

          <button
            title="prev"
            type="button"
            onClick={scrollPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 text-white backdrop-blur transition hover:bg-white/30"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={images[selectedIndex] ?? images[0]}
            alt=""
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain"
          />

          <button
            title="next"
            type="button"
            onClick={scrollNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 text-white backdrop-blur transition hover:bg-white/30"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
