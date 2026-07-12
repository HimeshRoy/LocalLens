import { Settings, Pencil, Share2, UserPlus } from "lucide-react";

interface ProfileActionsProps {
  isOwner: boolean;

  onEditProfile?: () => void;
  onSettings?: () => void;
  onShare?: () => void;
  onFollow?: () => void;
}

const ProfileActions = ({
  isOwner,
  onEditProfile,
  onSettings,
  onShare,
  onFollow,
}: ProfileActionsProps) => {
  if (isOwner) {
    return (
      <div className="mt-6 flex gap-3">

        <button
           onClick={onEditProfile}
          className="flex-1 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <span className="flex items-center justify-center gap-2">
            <Pencil size={18} />
            Edit Profile
          </span>
        </button>

        <button title="share"
          onClick={onShare}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white transition hover:bg-zinc-100"
        >
          <Share2 size={20} />
        </button>

        <button title="setting"
          onClick={onSettings}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white transition hover:bg-zinc-100"
        >
          <Settings size={20} />
        </button>

      </div>
    );
  }

  return (
    <div className="mt-6 flex gap-3">

      <button
        onClick={onFollow}
        className="flex-1 rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <span className="flex items-center justify-center gap-2">
          <UserPlus size={18} />
          Follow
        </span>
      </button>

      <button title="share"
        onClick={onShare}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white transition hover:bg-zinc-100"
      >
        <Share2 size={20} />
      </button>

    </div>
  );
};

export default ProfileActions;