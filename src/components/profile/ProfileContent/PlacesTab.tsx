import { Star, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useMyPlaces } from "../../../hooks/useMyPlaces";
import { useState } from "react";
import { useDeletePlace } from "../../../hooks/useDeletePlace";
import { toast } from "react-toastify";
import EditPlaceModal from "../../../components/place/EditPlaceModal";
import { useNavigate, Link } from "react-router-dom";

interface PlacesTabProps {
  places?: any[];
  isOwner?: boolean;
}

const PlacesTab = ({ places, isOwner = true }: PlacesTabProps) => {
  const { data, isLoading } = useMyPlaces(isOwner);
  const placesData = isOwner ? data?.data : (places ?? []);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const deletePlace = useDeletePlace();
  const [editingPlace, setEditingPlace] = useState<any>(null);
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="py-10 text-center text-zinc-500">Loading...</div>;
  }

  if (!placesData.length) {
    return <div className="py-20 text-center text-zinc-500">No places added yet.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-1 mt-4">
      {placesData.map((place: any) => (
        <div key={place.id} className="relative aspect-square bg-zinc-100">
          <Link to={`/places/${place.slug}`} className="block h-full w-full">
            <img
              src={place.coverImage || "https://placehold.co/400x400?text=No+Image"}
              alt={place.name}
              className="h-full w-full object-cover rounded-2xl"
            />
          </Link>

          {isOwner && (
            <div className="absolute right-1 top-1 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenMenu(openMenu === place.id ? null : place.id);
                }}
                className="p-1 drop-shadow-md text-shadow-zinc-500"
              >
                <MoreVertical size={20} />
              </button>

              {openMenu === place.id && (
                <div className="absolute right-0 top-8 w-32 rounded-lg border border-zinc-200 bg-white shadow-lg overflow-hidden">
                  <button
                    onClick={() => navigate(`/places/${place.id}/edit`)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-black hover:bg-zinc-50"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm(`Delete "${place.name}"?`)) return;
                      try {
                        await deletePlace.mutateAsync(place.id);
                        toast.success("Place deleted");
                        setOpenMenu(null);
                      } catch (error: any) {
                        toast.error("Failed to delete place.");
                      }
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          )}
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