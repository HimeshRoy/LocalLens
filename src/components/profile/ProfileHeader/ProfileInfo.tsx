import { BadgeCheck, MapPin } from "lucide-react";
import type { Profile } from "../../../api/user.api";

interface ProfileInfoProps {
  profile: Profile;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const isOfficial = profile.fullName.trim().toLowerCase() === "locallens";
  
  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex items-center gap-1">
        <span className="font-bold text-xl text-black">
          {profile.fullName}
        </span>

        {isOfficial ? (
          <BadgeCheck size={20} className="fill-blue-500 text-white" />
        ) : profile.isVerified ? (
          <BadgeCheck size={20} className="fill-blue-500 text-white" />
        ) : null}
      </div>

      <p className="mt-0.5 text-sm font-medium text-gray-500">
        @{profile.username}
      </p>

      {profile.bio && (
        <p className="mt-2 max-w-sm text-center text-sm leading-snug text-zinc-800">
          {profile.bio}
        </p>
      )}

      {(profile.city || profile.country) && (
        <div className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
          <MapPin size={14} />
          <span>
            {[profile.city, profile.country].filter(Boolean).join(", ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;