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
  onApprove?: () => void;
  onReject?: () => void;
  status?: "PENDING" | "APPROVED" | "REJECTED";
  isActive?: boolean;
  onRoleChange?: () => void;
  roleLabel?: string;
  onVerify?: () => void;
  isVerified?: boolean;
  verifyLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  toggleLabel?: string;
}

const RowActions = ({
  onEdit,
  onDelete,
  onToggle,
  onVerify,
  isVerified,
  verifyLabel,
  onApprove,
  onReject,
  status,
  isActive,
  editLabel,
  deleteLabel,
  toggleLabel,
  onRoleChange,
  roleLabel = "Change Role",
}: RowActionsProps) => {
  const [open, setOpen] = useState(false);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        !buttonRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        ref={buttonRef}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();

          const menuWidth = 192;
          const menuHeight = 180;
          const gap = 8;

          const spaceBelow = window.innerHeight - rect.bottom;
          const spaceAbove = rect.top;

          const shouldOpenUpward =
            spaceBelow < menuHeight && spaceAbove > spaceBelow;

          const top = shouldOpenUpward
            ? rect.top - menuHeight - gap
            : rect.bottom + gap;

          const left = Math.max(8, rect.right - menuWidth);

          setMenuPosition({
            top,
            left,
          });

          setOpen((prev) => !prev);
        }}
        className="rounded-lg p-2 transition hover:bg-zinc-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="fixed z-[99999] w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
          }}
        >
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

          {onApprove && status !== "APPROVED" && (
            <button
              onClick={() => {
                setOpen(false);
                onApprove();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
            >
              <BadgeCheck size={16} />
              Approve Place
            </button>
          )}

          {onReject && status !== "REJECTED" && (
            <button
              onClick={() => {
                setOpen(false);
                onReject();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
            >
              <EyeOff size={16} />
              Reject Place
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
