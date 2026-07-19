import type { AdminUser } from "../../../api/admin.api";
import RowActions from "../RowActions";
import Avatar from "../../common/Avatar";
import { useUpdateUserStatus } from "../../../hooks/useUpdateUserStatus";
import ConfirmDialog from "../../common/ConfirmDialog";
import { useState } from "react";
import { useUpdateUserVerification } from "../../../hooks/useUpdateUserVerification";
import { useUpdateUserRole } from "../../../hooks/useUpdateUserRole";
import { useDeleteUser } from "../../../hooks/useDeleteUser";
import RoleDialog from "../../common/RoleDialog";

interface UsersTableProps {
  users: AdminUser[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const { mutate: updateUserStatus, isPending } = useUpdateUserStatus();
  const { mutate: updateUserVerification, isPending: verificationPending } =
    useUpdateUserVerification();
  const { mutate: updateUserRole, isPending: rolePending } =
    useUpdateUserRole();

  const { mutate: deleteUser, isPending: deletePending } = useDeleteUser();

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<
    "USER" | "BUSINESS" | "ADMIN"
  >("USER");

  const [action, setAction] = useState<
    "status" | "verification" | "role" | "delete" | null
  >(null);

  const dialogTitle =
    action === "status"
      ? selectedUser?.isActive
        ? "Suspend User"
        : "Activate User"
      : action === "verification"
        ? selectedUser?.isVerified
          ? "Remove Verification"
          : "Verify User"
        : action === "role"
          ? "Change User Role"
          : "Delete User";

  const dialogMessage =
    action === "status"
      ? `Are you sure you want to ${
          selectedUser?.isActive ? "suspend" : "activate"
        } ${selectedUser?.fullName}?`
      : action === "verification"
        ? `Are you sure you want to ${
            selectedUser?.isVerified ? "remove verification from" : "verify"
          } ${selectedUser?.fullName}?`
        : action === "role"
          ? `Are you sure you want to change ${selectedUser?.fullName}'s role to ${selectedRole}?`
          : `Are you sure you want to permanently delete ${selectedUser?.fullName}?`;

  const confirmButtonText =
    action === "status"
      ? selectedUser?.isActive
        ? "Suspend"
        : "Activate"
      : action === "verification"
        ? selectedUser?.isVerified
          ? "Remove"
          : "Verify"
        : action === "role"
          ? "Change Role"
          : "Delete";

  const handleConfirmAction = () => {
    if (!selectedUser || !action) return;

    switch (action) {
      case "status":
        updateUserStatus(
          {
            userId: selectedUser.id,
            isActive: !selectedUser.isActive,
          },
          {
            onSuccess: () => {
              setAction(null);
              setSelectedUser(null);
            },
          },
        );
        break;

      case "verification":
        updateUserVerification(
          {
            userId: selectedUser.id,
            isVerified: !selectedUser.isVerified,
          },
          {
            onSuccess: () => {
              setAction(null);
              setSelectedUser(null);
            },
          },
        );
        break;

      case "role":
        updateUserRole(
          {
            userId: selectedUser.id,
            role: selectedRole,
          },
          {
            onSuccess: () => {
              setAction(null);
              setSelectedUser(null);
            },
          },
        );
        break;

      case "delete":
        deleteUser(selectedUser.id, {
          onSuccess: () => {
            setAction(null);
            setSelectedUser(null);
          },
        });
        break;
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-zinc-50">
          <tr className="text-left text-sm font-semibold text-zinc-600">
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Verified</th>
            <th className="px-6 py-4">Reviews</th>
            <th className="px-6 py-4">Places</th>
            <th className="px-6 py-4">Joined</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-zinc-100 hover:bg-zinc-50"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar image={user.avatar} name={user.fullName} />

                  <div>
                    <p className="font-semibold">{user.fullName}</p>

                    <p className="text-sm text-zinc-500">@{user.username}</p>

                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : user.role === "BUSINESS"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-zinc-100 text-zinc-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.isActive ? "Active" : "Suspended"}
                </span>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.isVerified
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.isVerified ? "Verified" : "Pending"}
                </span>
              </td>

              <td className="px-6 py-4">{user._count.reviews}</td>

              <td className="px-6 py-4">{user._count.places}</td>

              <td className="px-6 py-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-right">
                <RowActions
                  onEdit={() => {}}
                  onDelete={() => {
                    setSelectedUser(user);
                    setAction("delete");
                  }}
                  isActive={user.isActive}
                  onToggle={() => {
                    setSelectedUser(user);
                    setAction("status");
                  }}
                  onVerify={() => {
                    setSelectedUser(user);
                    setAction("verification");
                  }}
                  onRoleChange={() => {
                    setSelectedUser(user);
                    setSelectedRole(user.role);
                    setRoleDialogOpen(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        open={selectedUser !== null && action !== null}
        loading={
          isPending || verificationPending || rolePending || deletePending
        }
        title={dialogTitle}
        message={dialogMessage}
        confirmText={confirmButtonText}
        onClose={() => {
          setAction(null);
          setSelectedUser(null);
          setSelectedRole("USER");
        }}
        onConfirm={handleConfirmAction}
      />

      <RoleDialog
        open={roleDialogOpen}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        onClose={() => {
          setRoleDialogOpen(false);
          setSelectedUser(null);
        }}
        onContinue={() => {
          setRoleDialogOpen(false);
          setAction("role");
        }}
      />
    </div>
  );
};

export default UsersTable;
