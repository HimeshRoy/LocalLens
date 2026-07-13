import { BadgeCheck } from "lucide-react";

interface UserBadgeProps {
  fullName: string;
  isVerified?: boolean;
}

const UserBadge = ({ fullName, isVerified }: UserBadgeProps) => {
  const isOfficial =
    fullName.trim().toLowerCase() === "locallens";

  return (
    <div className="flex items-center gap-1">
      <span
        className={`font-semibold ${
          isOfficial ? "text-blue-600" : "text-zinc-900"
        }`}
      >
        {fullName}
      </span>

      {isOfficial ? (
        <BadgeCheck
          size={20}
          className="fill-yellow-400 text-white"
        />
      ) : isVerified ? (
        <BadgeCheck
          size={20}
          className="fill-blue-500 text-white"
        />
      ) : null}
    </div>
  );
};

export default UserBadge;