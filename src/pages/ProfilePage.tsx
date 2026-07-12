import { useState } from "react";
import EditProfileModal from "../components/profile/EditProfileModal";
import MainLayout from "../layouts/MainLayout";

import ProfileHeader from "../components/profile/ProfileHeader/ProfileHeader";
import ProfileContent from "../components/profile/ProfileContent/ProfileContent";

import { useProfile } from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";

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
      />

      <ProfileContent activeTab={activeTab} profile={profile} isOwner={true} />

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
