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
    icon: <Star size={24} strokeWidth={1.5} />,
    value: (profile: Profile) => profile._count.reviews,
  },
  {
    key: "collections",
    label: "Collections",
    icon: <Folder size={24} strokeWidth={1.5} />,
    value: (profile: Profile) => profile._count.collections,
  },
  {
    key: "saved",
    label: "Saved",
    icon: <Heart size={24} strokeWidth={1.5} />,
    value: (profile: Profile) => profile._count.favorites,
  },
  {
    key: "places",
    label: "Places",
    icon: <MapPin size={24} strokeWidth={1.5} />,
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
    <div className="mt-6">
      <div className="flex justify-around items-center py-4 border-t border-zinc-200">
        {visibleStats.map((stat) => (
          <div key={stat.key} className="flex flex-col items-center">
            <span className="text-lg font-bold text-black">
              {stat.value(profile)}
            </span>
            <span className="text-xs text-zinc-500">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-around border-t border-zinc-200">
        {stats.map((stat) => {
          const isActive = activeTab === stat.key;
          return (
            <button
              key={stat.key}
              onClick={() => onTabChange(stat.key)}
              className={`flex-1 py-3 flex justify-center transition-colors ${
                isActive
                  ? "border-t border-black -mt-[1px] text-black"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <div className={isActive ? "text-black" : "text-zinc-400"}>
                {stat.icon}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileStats;