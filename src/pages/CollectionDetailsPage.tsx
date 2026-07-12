import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useCollection } from "../hooks/useCollections";
import { Edit, Paperclip, Star, Trash2Icon } from "lucide-react";
import { useState } from "react";
import EditCollectionModal from "../components/collection/EditCollectionModal";
import { useDeleteCollection } from "../hooks/useDeleteCollection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRemovePlaceFromCollection } from "../hooks/useRemovePlaceFromCollection";

const CollectionDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useCollection(id);
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();

  const deleteCollection = useDeleteCollection();
  const removePlace = useRemovePlaceFromCollection();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="p-10 text-center">Loading...</div>
      </MainLayout>
    );
  }

  const collection = data?.data;

  if (!collection) {
    return (
      <MainLayout>
        <div className="p-10 text-center">Collection not found.</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl p-4 pb-20 px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            {collection.emoji} {collection.name}
          </h1>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              collection.isPrivate
                ? "bg-red-100 text-red-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {collection.isPrivate ? "Private" : "Public"}
          </span>
        </div>

        {collection.description && (
          <p className="mt-3 text-zinc-600">{collection.description}</p>
        )}

        <p className="mt-3 text-zinc-500">{collection.places.length} Places</p>

        <div className="mt-6 flex items-center justify-between px-3 gap-3">
          <button
            onClick={() => setEditOpen(true)}
            className="rounded-2xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            <Edit />
          </button>

          <button
            onClick={async () => {
              const confirmed = window.confirm(
                `Delete "${collection.name}"?\n\nThis action cannot be undone.`,
              );

              if (!confirmed) return;

              try {
                await deleteCollection.mutateAsync(collection.id);

                toast.success("Collection deleted successfully.");

                navigate("/profile");
              } catch (error: any) {
                toast.error(
                  error.response?.data?.message ??
                    "Failed to delete collection.",
                );
              }
            }}
            disabled={deleteCollection.isPending}
            className="rounded-2xl border border-red-200 bg-red-50 px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          >
            {deleteCollection.isPending ? "Deleting..." : <Trash2Icon />}
          </button>

          <button className="rounded-2xl border border-zinc-200 bg-white px-5 py-2.5 font-medium transition hover:bg-zinc-100">
            <Paperclip />
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collection.places.map((item: any) => (
            <div
              key={item.place.id}
              className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={
                  item.place.coverImage ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={item.place.name}
                className="h-25 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">{item.place.name}</h2>

                <p className="text-sm text-zinc-500">
                  📍 {item.place.city}, {item.place.state}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm">
                    {item.place.category.icon} {item.place.category.name}
                  </span>

                  <span className="font-medium text-amber-500 flex items-center gap-2">
                    <Star className="fill-amber-500" size={15} />{" "}
                    {item.place.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={async () => {
                      const confirmed = window.confirm(
                        `Remove "${item.place.name}" from this collection?`,
                      );

                      if (!confirmed) return;

                      try {
                        await removePlace.mutateAsync({
                          collectionId: collection.id,
                          placeId: item.place.id,
                        });

                        toast.success("Place removed from collection.");
                      } catch (error: any) {
                        toast.error(
                          error.response?.data?.message ??
                            "Failed to remove place.",
                        );
                      }
                    }}
                    className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <EditCollectionModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          collection={collection}
        />
      </div>
    </MainLayout>
  );
};

export default CollectionDetailsPage;
