import { Camera } from "lucide-react";
import type { Profile } from "../../../api/user.api";
import { useRef } from "react";
import { useUploadAvatar } from "../../../hooks/useUploadAvatar";

interface ProfileAvatarProps {
  profile: Profile;
  isOwner: boolean;
  onAvatarClick?: () => void;
}

const ProfileAvatar = ({
  profile,
  isOwner,
  onAvatarClick,
}: ProfileAvatarProps) => {
  const uploadAvatar = useUploadAvatar();

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-center">
      <div className="relative">
        <img
          src={
            profile.avatar ??
            "https://placehold.co/200x200/e5e7eb/6b7280?text=User"
          }
          alt={profile.fullName}
          className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl ring-4 ring-blue-50"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            try {
              await uploadAvatar.mutateAsync(file);
            } catch (error) {
              console.error(error);
            }
          }}
        />

        {isOwner && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
          >
            <Camera size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;
