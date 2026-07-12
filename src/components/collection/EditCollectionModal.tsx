import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdateCollection } from "../../hooks/useUpdateCollection";

interface Props {
  open: boolean;
  onClose: () => void;
  collection: any;
}

const EditCollectionModal = ({ open, onClose, collection }: Props) => {
  const updateCollection = useUpdateCollection();

  const [form, setForm] = useState({
    name: "",
    emoji: "",
    description: "",
    isPrivate: false,
  });

  useEffect(() => {
    if (!collection) return;

    setForm({
      name: collection.name,
      emoji: collection.emoji ?? "",
      description: collection.description ?? "",
      isPrivate: collection.isPrivate,
    });
  }, [collection]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit Collection</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <input
          value={form.emoji}
          onChange={(e) =>
            setForm({
              ...form,
              emoji: e.target.value,
            })
          }
          placeholder="🌍"
          className="mb-4 w-full rounded-xl border p-3"
        />

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          placeholder="Collection name"
          className="mb-4 w-full rounded-xl border p-3"
        />

        <textarea
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          placeholder="Description"
          className="mb-4 w-full rounded-xl border p-3"
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.isPrivate}
            onChange={(e) =>
              setForm({
                ...form,
                isPrivate: e.target.checked,
              })
            }
          />
          Private Collection
        </label>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border px-5 py-2">
            Cancel
          </button>

          <button
            onClick={async () => {
              try {
                await updateCollection.mutateAsync({
                  collectionId: collection.id,
                  payload: form,
                });

                toast.success("Collection updated successfully.");

                onClose();
              } catch (error: any) {
                toast.error(
                  error.response?.data?.message ??
                    "Failed to update collection.",
                );
              }
            }}
            disabled={updateCollection.isPending}
            className="rounded-xl bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
          >
            {updateCollection.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCollectionModal;
