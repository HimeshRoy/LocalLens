import { X } from "lucide-react";

type UserRole = "USER" | "BUSINESS" | "ADMIN";

interface RoleDialogProps {
  open: boolean;
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onClose: () => void;
  onContinue: () => void;
}

const roles: UserRole[] = ["USER", "BUSINESS", "ADMIN"];

const RoleDialog = ({
  open,
  selectedRole,
  onRoleChange,
  onClose,
  onContinue,
}: RoleDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-semibold">
            Change User Role
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 p-6">
          {roles.map((role) => (
            <label
              key={role}
              className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:bg-zinc-50"
            >
              <input
                type="radio"
                checked={selectedRole === role}
                onChange={() => onRoleChange(role)}
              />

              <span className="font-medium">{role}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onContinue}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleDialog;