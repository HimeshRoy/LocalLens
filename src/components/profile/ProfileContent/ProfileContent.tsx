import ReviewsTab from "./ReviewsTab";
import CollectionsTab from "./CollectionsTab";
import SavedTab from "./SavedTab";
import PlacesTab from "./PlacesTab";

export type ProfileTab = "reviews" | "collections" | "saved" | "places";

interface ProfileContentProps {
  activeTab: ProfileTab;
  profile?: any;
  isOwner?: boolean;
}

const ProfileContent = ({
  activeTab,
  profile,
  isOwner = true,
}: ProfileContentProps) => {
  switch (activeTab) {
    case "reviews":
      return (
        <ReviewsTab
          reviews={isOwner ? undefined : profile?.reviews}
          isOwner={isOwner}
        />
      );

    case "collections":
      return (
        <CollectionsTab
          collections={isOwner ? undefined : profile?.collections}
          isOwner={isOwner}
        />
      );

    case "saved":
      return isOwner ? <SavedTab /> : null;

    case "places":
      return (
        <PlacesTab
          places={isOwner ? undefined : profile?.places}
          isOwner={isOwner}
        />
      );

    default:
      return (
        <ReviewsTab
          reviews={isOwner ? undefined : profile?.reviews}
          isOwner={isOwner}
        />
      );
  }
};

export default ProfileContent;
