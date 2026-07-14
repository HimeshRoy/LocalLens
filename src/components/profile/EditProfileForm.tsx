import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMyProfile } from "../../hooks/useMyProfile";
import { useCheckUsername } from "../../hooks/useCheckUsername";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const { data, isLoading } = useMyProfile();
  const navigate = useNavigate();

  const updateProfile = useUpdateProfile();

  const profile = data?.data;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    profile?.avatar ?? null,
  );

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    bio: "",
    city: "",
    country: "",
    isPrivate: false,
  });

  const usernameChanged = form.username.trim() !== profile?.username;

  const { data: usernameData, isLoading: checkingUsername } = useCheckUsername(
    form.username,
  );

  const usernameAvailable = usernameChanged
    ? usernameData?.data?.available
    : true;

  useEffect(() => {
    if (!profile) return;

    setForm({
      fullName: profile.fullName ?? "",
      username: profile.username ?? "",
      bio: profile.bio ?? "",
      city: profile.city ?? "",
      country: profile.country ?? "",
      isPrivate: profile.isPrivate ?? false,
    });

    setPreview(profile.avatar);
  }, [profile]);

  const hasChanges =
    form.fullName !== (profile?.fullName ?? "") ||
    form.username !== (profile?.username ?? "") ||
    form.bio !== (profile?.bio ?? "") ||
    form.city !== (profile?.city ?? "") ||
    form.country !== (profile?.country ?? "") ||
    preview !== (profile?.avatar ?? null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      await updateProfile.mutateAsync({
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        bio: form.bio.trim(),
        city: form.city.trim(),
        country: form.country.trim(),
      });

      toast.success("Profile updated successfully.");

      navigate("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Failed to update profile.");
    }
  };

  useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (!hasChanges) return;

    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [hasChanges]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative"
        >
          <img
            src={preview ?? "https://placehold.co/200x200?text=User"}
            alt="Avatar"
            className="h-32 w-32 rounded-full object-cover ring-4 ring-white shadow-lg"
          />

          <div className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition group-hover:scale-110">
            <Camera size={18} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 font-medium text-blue-600 hover:text-blue-700"
        >
          Change Profile Photo
        </button>

        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Profile Information</h2>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Username</label>

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
            {usernameChanged && form.username.length >= 3 && (
              <p
                className={`mt-2 text-sm ${
                  checkingUsername
                    ? "text-zinc-500"
                    : usernameAvailable
                      ? "text-green-600"
                      : "text-red-600"
                }`}
              >
                {checkingUsername
                  ? "Checking username..."
                  : usernameAvailable
                    ? "Username available"
                    : "Username already taken"}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Bio</label>

            <textarea
              rows={3}
              maxLength={50}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <p className="mt-2 text-right text-xs text-zinc-500">
              {form.bio.length}/50
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Location</h2>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">City</label>

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Country</label>

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Enter your country"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-20 mt-8 p-4">
        <button
          onClick={handleSave}
          disabled={
            !hasChanges ||
            checkingUsername ||
            !usernameAvailable ||
            updateProfile.isPending
          }
          className={`w-full rounded-xl py-3 font-semibold transition ${
            !hasChanges ||
            checkingUsername ||
            !usernameAvailable ||
            updateProfile.isPending
              ? "cursor-not-allowed bg-zinc-300 text-zinc-500"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {updateProfile.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
