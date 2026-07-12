import { BadgeCheck, CalendarDays, MapPin } from "lucide-react";
import type { Profile } from "../../../api/user.api";

interface ProfileInfoProps {
  profile: Profile;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <div className="mt-6 flex flex-col items-center">

      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          {profile.fullName}
        </h1>

        {profile.isVerified && (
          <BadgeCheck
            size={22}
            className="fill-blue-500 text-white"
          />
        )}
      </div>

      <p className="mt-1 text-base font-medium text-zinc-500">
        @{profile.username}
      </p>

      {(profile.city || profile.country) && (
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
          <MapPin size={16} />

          <span>
            {[profile.city, profile.country]
              .filter(Boolean)
              .join(", ")}
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