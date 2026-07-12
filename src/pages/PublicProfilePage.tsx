import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProfileHeader from "../components/profile/ProfileHeader/ProfileHeader";
import ProfileContent from "../components/profile/ProfileContent/ProfileContent";
import { toast } from "react-toastify";
import { usePublicProfile } from "../hooks/usePublicProfile";
import { useState } from "react";

const PublicProfilePage = () => {
  const { username } = useParams();

  const [activeTab, setActiveTab] = useState<
    "reviews" | "collections" | "saved" | "places"
  >("places");

  const { data, isLoading } = usePublicProfile(username!);

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
        <div className="p-10 text-center">User not found.</div>
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
        isOwner={false}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onShare={handleShare}
      />

      <ProfileContent activeTab={activeTab} profile={profile} isOwner={false} />
      </div>
    </MainLayout>
  );
};

export default PublicProfilePage;
