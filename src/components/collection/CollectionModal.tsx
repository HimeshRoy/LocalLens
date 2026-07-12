import { useCollections } from "../../hooks/useCollections";
import { FolderPlus, X } from "lucide-react";
import { toast } from "react-toastify";
import { useAddToCollection } from "../../hooks/useAddToCollection";
import { useState } from "react";
import { useCreateCollection } from "../../hooks/useCreateCollection";

interface CollectionModalProps {
  open: boolean;
  onClose: () => void;
  placeId: string;
}

const CollectionModal = ({ open, onClose, placeId }: CollectionModalProps) => {
  const { data, isLoading } = useCollections();
  const addToCollection = useAddToCollection();

  const createCollection = useCreateCollection();

  const [creating, setCreating] = useState(false);

  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📂");
  const [description, setDescription] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Save to Collection</h2>

          <button onClick={onClose} aria-label="Close modal">
            <X />
          </button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {data?.data.map((collection) => (
              <button
                key={collection.id}
                onClick={async () => {
                  try {
                    await addToCollection.mutateAsync({
                      collectionId: collection.id,
                      placeId,
                    });

                    toast.success(`Saved to "${collection.name}"`);

                    onClose();
                  } catch (error: any) {
                    toast.error(
                      error.response?.data?.message ?? "Failed to save place.",
                    );
                  }
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-4 transition hover:bg-zinc-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{collection.emoji || "📂"}</span>

                  <div className="text-left">
                    <p className="font-semibold">{collection.name}</p>

                    <p className="text-sm text-zinc-500">
                      {collection.placesCount} places
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {creating ? (
              <div className="mt-4 space-y-3 rounded-2xl border border-zinc-200 p-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Collection name"
                  className="w-full rounded-xl border border-zinc-200 p-3 outline-none focus:border-blue-500"
                />

                <input
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  placeholder="Emoji"
                  className="w-full rounded-xl border border-zinc-200 p-3 outline-none focus:border-blue-500"
                />

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Description (optional)"
                  className="w-full rounded-xl border border-zinc-200 p-3 outline-none focus:border-blue-500"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCreating(false)}
                    className="flex-1 rounded-xl border border-zinc-200 py-3"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const collection = await createCollection.mutateAsync({
                          name,
                          emoji,
                          description,
                        });

                        toast.success("Collection created.");

                        setCreating(false);

                        setName("");
                        setEmoji("📂");
                        setDescription("");
                      } catch (error: any) {
                        toast.error(
                          error.response?.data?.message ??
                            "Failed to create collection.",
                        );
                      }
                    }}
                    className="flex-1 rounded-xl bg-blue-600 py-3 text-white"
                  >
                    Create
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setCreating(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 py-4 font-semibold transition hover:bg-zinc-100"
              >
                <FolderPlus />
                Create Collection
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionModal;
