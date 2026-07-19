import {
  MoreVertical,
  Pencil,
  Trash2,
  EyeOff,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;

  onVerify?: () => void;
  isVerified?: boolean;
  verifyLabel?: string;
  isActive?: boolean;
  onRoleChange?: () => void;
  roleLabel?: string;

  editLabel?: string;
  deleteLabel?: string;
  toggleLabel?: string;
}

const RowActions = ({
  onEdit,
  onDelete,
  onToggle,
  onVerify,
  isActive,
  isVerified,
  editLabel,
  deleteLabel,
  toggleLabel,
  verifyLabel,
  onRoleChange,
  roleLabel = "Change Role",
}: RowActionsProps) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 transition hover:bg-zinc-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-100 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl">
          {onEdit && (
            <button
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
            >
              <Pencil size={16} />
              {editLabel ?? "Edit"}
            </button>
          )}

          {onToggle && (
            <button
              onClick={() => {
                setOpen(false);
                onToggle();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
            >
              <EyeOff size={16} />

              {toggleLabel ?? (isActive === true ? "Deactivate" : "Activate")}
            </button>
          )}

          {onVerify && (
            <button
              onClick={() => {
                setOpen(false);
                onVerify();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
            >
              <BadgeCheck size={16} />

              {verifyLabel ??
                (isVerified ? "Remove Verification" : "Verify User")}
            </button>
          )}

          {onRoleChange && (
            <button
              onClick={() => {
                setOpen(false);
                onRoleChange();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
            >
              <ShieldCheck size={16} />
              {roleLabel}
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />

              {deleteLabel ?? "Delete"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RowActions;
