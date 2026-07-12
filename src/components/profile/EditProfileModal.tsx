import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import type { Profile } from "../../api/user.api";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: Profile;
}

const EditProfileModal = ({
  open,
  onClose,
  profile,
}: EditProfileModalProps) => {
  const updateProfile = useUpdateProfile();

  const [form, setForm] = useState({
    fullName: profile.fullName,
    username: profile.username,
    bio: profile.bio ?? "",
    city: profile.city ?? "",
    country: profile.country ?? "",
    isPrivate: (profile as any).isPrivate ?? false,
  });

  useEffect(() => {
    setForm({
      fullName: profile.fullName,
      username: profile.username,
      bio: profile.bio ?? "",
      city: profile.city ?? "",
      country: profile.country ?? "",
      isPrivate: (profile as any).isPrivate ?? false,
    });
  }, [profile, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 pb-26">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-100 p-5">
          <h2 className="text-xl font-semibold">Edit Profile</h2>

          <button title="close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-2 px-3 py-2 flex-col justify-start items-center">
          <label htmlFor="name" className="text-zinc-400 px-2">
            Name
          </label>
          <input
            id="name"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
            placeholder="Full Name"
            className="w-full rounded-md border border-blue-300 px-4 py-3 outline-blue-300"
          />

          <label htmlFor="username" className="text-zinc-400 px-2">
            Username
          </label>
          <input
            id="username"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            placeholder="Username"
            className="w-full rounded-md border border-blue-300 px-4 py-3 outline-blue-300"
          />

          <label htmlFor="bio" className="text-zinc-400 px-2">
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            value={form.bio}
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value,
              })
            }
            placeholder="Bio"
            className="w-full rounded-md border border-blue-300 px-4 py-3 outline-blue-300"
          />

          <label htmlFor="city" className="text-zinc-400 px-2">
            City
          </label>
          <input
            id="city"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
            placeholder="City"
            className="w-full rounded-md border border-blue-300 px-4 py-3 outline-blue-300"
          />

          <label htmlFor="country" className="text-zinc-400 px-2">
            Country
          </label>
          <input
            id="country"
            value={form.country}
            onChange={(e) =>
              setForm({
                ...form,
                country: e.target.value,
              })
            }
            placeholder="Country"
            className="w-full rounded-md border border-blue-300 px-4 py-3 outline-blue-300"
          />

          <label htmlFor="isPrivate" className="text-zinc-400 px-2 flex items-center gap-2">
            <input
              id="isPrivate"
              type="checkbox"
              checked={form.isPrivate}
              onChange={(e) =>
                setForm({
                  ...form,
                  isPrivate: e.target.checked,
                })
              }
              className="h-4 w-4"
            />
            Private account
          </label>
        </div>

        <div className="flex justify-end gap-3 p-4">
          <button onClick={onClose} className="rounded-xl border px-5 py-2">
            Cancel
          </button>

          <button
            onClick={async () => {
              try {
                await updateProfile.mutateAsync(form);
                onClose();
              } catch (error) {
                console.error(error);
              }
            }}
            disabled={updateProfile.isPending}
            className="rounded-xl bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
          >
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
