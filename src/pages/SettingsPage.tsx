import MainLayout from "../layouts/MainLayout";
import { useProfile } from "../hooks/useProfile";
import { useState, useEffect } from "react";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const SettingsPage = () => {
  const { data } = useProfile();
  const updateProfile = useUpdateProfile();
  const profile = data?.data;
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (profile) {
      setIsPrivate(profile.isPrivate);
    }
  }, [profile]);

  const handlePrivacyToggle = async () => {
    const newValue = !isPrivate;

    setIsPrivate(newValue);

    try {
      await updateProfile.mutateAsync({
        isPrivate: newValue,
      });

      toast.success(
        newValue ? "Profile is now private." : "Profile is now public.",
      );
    } catch (error) {
      setIsPrivate(!newValue);

      toast.error("Failed to update privacy.");
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    logout();

    toast.success("Logged out successfully.");

    navigate("/");
  };
  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl space-y-8 py-8 px-4">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>

          <p className="mt-2 text-zinc-500">Manage your account and privacy.</p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Privacy</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Control who can see your profile.
            </p>
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-zinc-100 p-4">
              <div>
                <h3 className="font-medium">Private Profile</h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Only you can view your profile.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrivacyToggle}
                className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
                  isPrivate ? "bg-blue-600" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-300 ${
                    isPrivate ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Account</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Manage your account session.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded-2xl border border-red-200 p-4 text-red-600 transition hover:bg-red-50"
          >
            <div>
              <h3 className="text-left font-medium">Logout</h3>

              <p className="mt-1 text-left text-sm text-red-400">
                Sign out from your account.
              </p>
            </div>

            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
