import { useState } from "react";
import EditProfileModal from "../components/profile/EditProfileModal";
import MainLayout from "../layouts/MainLayout";
import ProfileHeader from "../components/profile/ProfileHeader/ProfileHeader";
import ProfileContent from "../components/profile/ProfileContent/ProfileContent";
import { useProfile } from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "reviews" | "collections" | "saved" | "places"
  >("reviews");

  const navigate = useNavigate();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="p-10 text-center">Loading...</div>
      </MainLayout>
    );
  }

  const profile = data?.data;

  if (!profile) {
    return (
      <MainLayout>
        <div className="p-10 text-center">Profile not found.</div>
      </MainLayout>
    );
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/users/${profile.username}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.fullName} on LocalLens`,
          text: `Check out ${profile.fullName}'s LocalLens profile.`,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      toast.success("Profile link copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="px-4">
        <ProfileHeader
          profile={profile}
          isOwner={true}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onEditProfile={() => setEditProfileOpen(true)}
          onSettings={() => navigate("/settings")}
          onShare={handleShare}
        />

        <ProfileContent
          activeTab={activeTab}
          profile={profile}
          isOwner={true}
        />

        <EditProfileModal
          open={editProfileOpen}
          onClose={() => setEditProfileOpen(false)}
          profile={profile}
        />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
