import { Heart, Folder, Star, MapPin } from "lucide-react";
import type { Profile } from "../../../api/user.api";

interface ProfileStatsProps {
  profile: Profile;

  isOwner: boolean;

  activeTab: "reviews" | "collections" | "saved" | "places";

  onTabChange: (tab: "reviews" | "collections" | "saved" | "places") => void;
}

const stats = [
  {
    key: "reviews",
    label: "Reviews",
    color: "text-yellow-500",
    icon: <Star />,
    value: (profile: Profile) => profile._count.reviews,
  },
  {
    key: "collections",
    label: "Collection",
    color: "text-blue-500",
    icon: <Folder />,
    value: (profile: Profile) => profile._count.collections,
  },
  {
    key: "saved",
    label: "Saved",
    color: "text-red-500",
    icon: <Heart />,
    value: (profile: Profile) => profile._count.favorites,
  },
  {
    key: "places",
    label: "Places",
    color: "text-green-500",
    icon: <MapPin />,
    value: (profile: Profile) => profile._count.places,
  },
] as const;

const ProfileStats = ({
  profile,
  isOwner,
  activeTab,
  onTabChange,
}: ProfileStatsProps) => {
  const visibleStats = isOwner
    ? stats
    : stats.filter((stat) => stat.key !== "saved");

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4 p-2 mb-10">
        {visibleStats.map((stat) => (
          <div
            key={stat.key}
            className="bg-zinc-100 p-3 rounded-lg flex-col items-center justify-center"
          >
            <h3 className={`text-2xl text-center font-bold`}>
              {stat.value(profile)}
            </h3>

            <p className="text-center">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className={`grid ${isOwner ? "grid-cols-4" : "grid-cols-4"}`}>
        {stats.map((stat) => (
          <button
            key={stat.key}
            onClick={() => onTabChange(stat.key)}
            className={`py-2 transition ${
              activeTab === stat.key
                ? "border-b border-blue-500"
                : "hover:bg-zinc-50"
            }`}
          >
            <p
              className={`mt-1 text-sm text-center flex items-center justify-center ${
                activeTab === stat.key ? "text-blue-600" : "text-zinc-500"
              }`}
            >
              {stat.icon}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
