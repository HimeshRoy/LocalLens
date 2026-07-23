import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";

interface ProfileHeaderProps {
  profile: any;

  isOwner: boolean;

  activeTab: "reviews" | "collections" | "saved" | "places";

  onTabChange: (tab: "reviews" | "collections" | "saved" | "places") => void;

  onEditProfile?: () => void;
  onAvatarClick?: () => void;
  onSettings?: () => void;
  onShare?: () => void;
  onFollow?: () => void;
}

const ProfileHeader = ({
  profile,
  isOwner,
  activeTab,
  onTabChange,
  onEditProfile,
  onAvatarClick,
  onSettings,
  onShare,
  onFollow,
}: ProfileHeaderProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <ProfileAvatar
        profile={profile}
        isOwner={isOwner}
        onAvatarClick={onAvatarClick}
      />

      <ProfileInfo profile={profile} />
      <ProfileActions
        isOwner={isOwner}
        onEditProfile={onEditProfile}
        onSettings={onSettings}
        onShare={onShare}
        onFollow={onFollow}
      />

      <ProfileStats
        profile={profile}
        isOwner={isOwner}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
};

export default ProfileHeader;
