import { Camera } from "lucide-react";
import type { Profile } from "../../../api/user.api";
import { useRef } from "react";
import { useUploadAvatar } from "../../../hooks/useUploadAvatar";

interface ProfileAvatarProps {
  profile: Profile;
  isOwner: boolean;
  onAvatarClick?: () => void;
}

const ProfileAvatar = ({ profile, isOwner }: ProfileAvatarProps) => {
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
          className="h-24 w-24 rounded-full border border-zinc-200 object-cover"
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
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 text-black shadow-sm transition active:scale-95"
          >
            <Camera size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;