import { BadgeCheck, CalendarDays, MapPin } from "lucide-react";
import type { Profile } from "../../../api/user.api";

interface ProfileInfoProps {
  profile: Profile;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const isOfficial = profile.fullName.trim().toLowerCase() === "locallens";
  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="flex items-center gap-1">
        <span
          className={`font-semibold text-2xl ${
            isOfficial ? "text-blue-600" : "text-zinc-900"
          }`}
        >
          {profile.fullName}
        </span>

        {isOfficial ? (
          <BadgeCheck size={25} className="fill-yellow-400 text-white" />
        ) : profile.isVerified ? (
          <BadgeCheck size={25} className="fill-blue-500 text-white" />
        ) : null}
      </div>

      <p className="mt-1 text-base font-medium text-zinc-500">
        @{profile.username}
      </p>

      {(profile.city || profile.country) && (
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
          <MapPin size={16} />

          <span>
            {[profile.city, profile.country].filter(Boolean).join(", ")}
          </span>
        </div>
      )}

      <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
        <CalendarDays size={15} />

        <span>
          Joined{" "}
          {new Date(profile.createdAt).toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {profile.bio && (
        <p className="mt-5 max-w-xl text-center leading-7 text-zinc-600">
          {profile.bio}
        </p>
      )}
    </div>
  );
};

export default ProfileInfo;
