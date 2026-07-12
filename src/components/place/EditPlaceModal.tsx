import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { useCategories } from "../../hooks/useCategories";
import { useUpdatePlace } from "../../hooks/useUpdatePlace";
import {
  PRICE_RANGES,
  PRICE_RANGE_LABELS,
  type PriceRange,
} from "../../types/place.types";

interface Props {
  open: boolean;
  onClose: () => void;
  place: any;
}

const EditPlaceModal = ({ open, onClose, place }: Props) => {
  const { data: categories } = useCategories();
  const updatePlace = useUpdatePlace();

  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    priceRange: "MODERATE" as PriceRange,
  });

  useEffect(() => {
    if (!place) return;

    setForm({
      name: place.name,
      description: place.description ?? "",
      categoryId: place.categoryId,
      priceRange: place.priceRange,
    });
  }, [place]);

  if (!open || !place) return null;

  const handleSave = async () => {
    try {
      await updatePlace.mutateAsync({
        placeId: place.id,
        payload: form,
      });

      toast.success("Place updated successfully.");

      onClose();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to update place."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Edit Place
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Place Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryId: e.target.value,
                })
              }
              className="w-full rounded-xl border p-3"
            >
              {categories?.data.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Price Range
            </label>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {PRICE_RANGES.map((price) => (
                <button
                  key={price}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      priceRange: price,
                    })
                  }
                  className={`rounded-xl border p-3 transition ${
                    form.priceRange === price
                      ? "border-blue-600 bg-blue-50"
                      : "border-zinc-200"
                  }`}
                >
                  {PRICE_RANGE_LABELS[price]}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={updatePlace.isPending}
            className="rounded-xl bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
          >
            {updatePlace.isPending
              ? "Saving..."
              : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default EditPlaceModal;