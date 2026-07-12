import { Star } from "lucide-react";
import { useMyPlaces } from "../../../hooks/useMyPlaces";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeletePlace } from "../../../hooks/useDeletePlace";
import { toast } from "react-toastify";
import EditPlaceModal from "../../../components/place/EditPlaceModal";
import { useNavigate } from "react-router-dom";

interface PlacesTabProps {
  places?: any[];
  isOwner?: boolean;
}

const PlacesTab = ({
  places,
  isOwner = true,
}: PlacesTabProps) => {
  const { data, isLoading } = useMyPlaces(isOwner);
  const placesData = isOwner ? data?.data : (places ?? []);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const deletePlace = useDeletePlace();
  const [editingPlace, setEditingPlace] = useState<any>(null);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="py-10 text-center text-zinc-500">Loading places...</div>
    );
  }

  if (!placesData.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
        You haven't added any places yet.
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      {placesData.map((place: any) => (
        <div
          key={place.id}
          className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <img
              src={
                place.coverImage || "https://placehold.co/600x400?text=No+Image"
              }
              alt={place.name}
              className="h-24 w-24 rounded-2xl object-cover"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{place.name}</h2>

                  <span className="mt-1 flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="fill-amber-500" size={15} />
                    {place.averageRating ?? "New"}
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === place.id ? null : place.id)
                    }
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openMenu === place.id && (
                    <div className="absolute right-0 top-8 z-20 w-40 rounded-xl border border-zinc-200 bg-white shadow-lg">
                      <button
                        onClick={() => navigate(`/places/${place.id}/edit`)}
                        className="flex w-full items-center gap-2 px-4 py-3 hover:bg-zinc-100"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          const confirmed = window.confirm(
                            `Delete "${place.name}"?\n\nThis place will no longer be visible to users.`,
                          );

                          if (!confirmed) return;

                          try {
                            await deletePlace.mutateAsync(place.id);

                            toast.success("Place deleted successfully.");

                            setOpenMenu(null);
                          } catch (error: any) {
                            toast.error(
                              error.response?.data?.message ??
                                "Failed to delete place.",
                            );
                          }
                        }}
                        className="flex w-full items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-zinc-500">{place.city}</p>
                <span className="rounded-4xl bg-zinc-200 px-2 py-1 text-sm">
                  {place.category?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <EditPlaceModal
        open={!!editingPlace}
        place={editingPlace}
        onClose={() => setEditingPlace(null)}
      />
    </div>
  );
};

export default PlacesTab;
