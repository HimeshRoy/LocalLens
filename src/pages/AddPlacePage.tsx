import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useCategories } from "../hooks/useCategories";
import { useLocation } from "../hooks/useLocation";
import { Locate } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchLocation } from "../hooks/useSearchLocation";
import { useCreatePlace } from "../hooks/useCreatePlace";
import { toast } from "react-toastify";
import {
  PRICE_RANGES,
  type PriceRange,
  PRICE_RANGE_LABELS,
} from "../types/place.types";
import { useUploadPlaceImages } from "../hooks/useUploadPlaceImages";
import { useNavigate } from "react-router-dom";

const AddPlacePage = () => {
  const [step, setStep] = useState(1);
  const [placeName, setPlaceName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const { data: categories, isPending } = useCategories();
  const { loading, refreshLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState<PriceRange>("MODERATE");

  const [images, setImages] = useState<File[]>([]);

  const { data: searchResults } = useSearchLocation(debouncedSearch);

  const [selectedLocation, setSelectedLocation] = useState<{
    displayName: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const createPlaceMutation = useCreatePlace();
  const uploadPlaceImagesMutation = useUploadPlaceImages();

  const MAX_IMAGES = 10;
  const MAX_SIZE = 5 * 1024 * 1024;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed.`);
      return;
    }

    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image.`);
        continue;
      }

      if (file.size > MAX_SIZE) {
        toast.error(`${file.name} exceeds 5MB.`);
        continue;
      }

      validFiles.push(file);
    }

    setImages((prev) => [...prev, ...validFiles]);
  };

  const handleCreatePlace = async () => {
    if (!selectedLocation) {
      toast.error("Please select a location.");
      return;
    }
    const payload = {
      name: placeName.trim(),
      description: description.trim(),
      categoryId,

      address: selectedLocation.displayName || "Address",
      city: selectedLocation.city || "City",
      state: selectedLocation.state || "State",
      country: selectedLocation.country || "Country",

      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,

      priceRange,
    };

    try {
      const place = await createPlaceMutation.mutateAsync(payload);

      if (images.length > 0) {
        await uploadPlaceImagesMutation.mutateAsync({
          placeId: place.data.id,
          files: images,
        });
      }

      toast.success("Place created successfully!", {
        onClose: () => navigate(`/places/${place.data.slug}`),
        autoClose: 1500,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to create place.");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl pb-15 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add a New Place</h1>

          <p className="mt-2 text-zinc-500">
            Help others discover amazing places around you.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">Step {step} of 4</p>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${(step / 4) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="clay rounded-3xl p-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Basic Information
              </h2>

              <p className="mt-2 text-zinc-500">Tell us about this place.</p>

              <div className="mt-8">
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Place Name
                </label>

                <input
                  type="text"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="e.g. Blue Tokai Coffee Roasters"
                  className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                <div className="mt-2 flex justify-between text-sm">
                  <span
                    className={
                      placeName.trim().length >= 3
                        ? "text-green-600"
                        : "text-zinc-500"
                    }
                  >
                    {placeName.trim().length >= 3
                      ? "✓ Looks good"
                      : "Minimum 3 characters"}
                  </span>

                  <span className="text-zinc-400">{placeName.length}/100</span>
                </div>
                <div className="mt-8">
                  <label className="mb-3 block text-sm font-medium text-zinc-700">
                    Category
                  </label>

                  {isPending ? (
                    <p className="text-sm text-zinc-500">
                      Loading categories...
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {categories?.data.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setCategoryId(category.id)}
                          className={`rounded-2xl border p-3 text-left transition ${
                            categoryId === category.id
                              ? "border-green-600 bg-blue-50"
                              : "border-zinc-200 hover:border-blue-300"
                          }`}
                        >
                          <p className="font-semibold text-center">
                            {category.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    maxLength={500}
                    placeholder="Tell people what makes this place special..."
                    className="w-full rounded-2xl border border-zinc-200 bg-white p-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
                  />

                  <div className="mt-2 flex justify-between text-sm">
                    <span
                      className={
                        description.trim().length >= 20
                          ? "text-green-600"
                          : "text-zinc-500"
                      }
                    >
                      {description.trim().length >= 20
                        ? "✓ Good description"
                        : "Minimum 20 characters"}
                    </span>

                    <span className="text-zinc-400">
                      {description.length}/500
                    </span>
                  </div>
                </div>
                <div className="mt-8">
                  <label className="mb-3 block text-sm font-medium text-zinc-700">
                    Price Range
                  </label>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                    {PRICE_RANGES.map((price) => (
                      <button
                        key={price}
                        type="button"
                        onClick={() => setPriceRange(price)}
                        className={`rounded-2xl border p-4 transition ${
                          priceRange === price
                            ? "border-blue-600 bg-blue-50"
                            : "border-zinc-200 hover:border-blue-300"
                        }`}
                      >
                        {PRICE_RANGE_LABELS[price]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  disabled={
                    placeName.trim().length < 3 ||
                    !categoryId ||
                    description.trim().length < 20
                  }
                  onClick={() => setStep(2)}
                  className={`rounded-2xl px-6 py-3 font-semibold text-white transition ${
                    placeName.trim().length >= 3 && categoryId
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "cursor-not-allowed bg-zinc-300"
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Location</h2>

              <p className="mt-2 text-zinc-500">
                Tell us where this place is located.
              </p>

              <button
                type="button"
                onClick={async () => {
                  const location = await refreshLocation();

                  if (!location) return;

                  setSelectedLocation({
                    displayName: `${location.city}, ${location.state}, ${location.country}`,
                    city: location.city,
                    state: location.state,
                    country: location.country,
                    latitude: location.latitude,
                    longitude: location.longitude,
                  });
                }}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                <Locate />{" "}
                {loading ? "Detecting location..." : "Use Current Location"}
              </button>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Search Address
                </label>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city, area or address..."
                  className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {searchResults?.data?.length > 0 && (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                    {searchResults.data.map((location: any) => (
                      <button
                        key={`${location.latitude}-${location.longitude}`}
                        type="button"
                        onClick={() => {
                          // FIX 2: Parse the displayName string into city, state, and country parts
                          const addressParts = location.displayName
                            ? location.displayName.split(",").map((p: string) => p.trim())
                            : [];

                          // Safely assign extracted values or use our fallbacks
                          const extractedCity = addressParts[0] || "";
                          const extractedState = addressParts[1] || "";
                          const extractedCountry = addressParts[addressParts.length - 1] || "";

                          setSelectedLocation({
                            displayName: location.displayName,
                            city: location.city || extractedCity || "Unknown City",
                            state: location.state || extractedState || "Unknown State",
                            country: location.country || extractedCountry || "Unknown Country",
                            latitude: location.latitude,
                            longitude: location.longitude,
                          });
                          setSearchQuery("");
                        }}
                        className="w-full border-b border-zinc-100 p-4 text-left transition hover:bg-zinc-50 last:border-b-0"
                      >
                        <p className="font-medium">📍 {location.displayName}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedLocation && (
                <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-5">
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Selected Location
                    </p>

                    <h3 className="mt-2 text-lg text-zinc-900">
                      {selectedLocation.displayName}
                    </h3>

                    <p className="mt-3 text-xs text-zinc-500">
                      {selectedLocation.latitude.toFixed(6)},{" "}
                      {selectedLocation.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-2xl border border-zinc-300 px-6 py-3 font-semibold"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  disabled={!selectedLocation}
                  onClick={() => setStep(3)}
                  className={`rounded-2xl px-6 py-3 font-semibold text-white transition ${
                    selectedLocation
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "cursor-not-allowed bg-zinc-300"
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold">Photos</h2>

              <p className="mt-2 text-zinc-500">Upload photos of this place.</p>

              <label
                htmlFor="place-images"
                className="mt-8 flex h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-50 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <span className="text-5xl">📷</span>

                <p className="mt-4 font-semibold">Click to upload photos</p>

                <p className="mt-2 text-sm text-zinc-500">
                  JPG, PNG, WEBP • Max 10 images
                </p>
              </label>

              <input
                id="place-images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-2xl"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="h-36 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                      >
                        ✕
                      </button>

                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                          Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-3 text-sm text-zinc-500 text-center">
                {images.length} / 10 photos selected
              </p>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-2xl border border-zinc-300 px-6 py-3 font-semibold"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  disabled={images.length === 0}
                  onClick={() => setStep(4)}
                  className={`rounded-2xl px-6 py-3 font-semibold text-white transition ${
                    images.length > 0
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "cursor-not-allowed bg-zinc-300"
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Review Your Place
              </h2>

              <p className="mt-2 text-zinc-500">
                Make sure everything looks correct before publishing.
              </p>

              <div className="mt-8 space-y-6">
                <div className="rounded-2xl border border-zinc-200 p-5">
                  <h3 className="font-semibold">Basic Information</h3>

                  <div className="mt-4 space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {placeName}
                    </p>

                    <p>
                      <span className="font-medium">Category:</span>{" "}
                      {categories?.data.find((c) => c.id === categoryId)?.name}
                    </p>

                    <p>
                      <span className="font-medium">Description:</span>
                    </p>

                    <p className="text-zinc-600 line-clamp-3">{description}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 p-5">
                  <h3 className="font-semibold">Location</h3>

                  <p className="mt-3 text-sm">
                    📍 {selectedLocation?.displayName}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 p-5">
                  <h3 className="font-semibold">Photos ({images.length})</h3>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="h-24 w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-2xl border border-zinc-300 px-6 py-3 font-semibold"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  disabled={
                    createPlaceMutation.isPending ||
                    uploadPlaceImagesMutation.isPending
                  }
                  onClick={handleCreatePlace}
                  className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  {createPlaceMutation.isPending ||
                  uploadPlaceImagesMutation.isPending
                    ? "Creating..."
                    : "Create Place"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AddPlacePage;