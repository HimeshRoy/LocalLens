import { Search, Download } from "lucide-react";

interface UsersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  role: "USER" | "BUSINESS" | "ADMIN" | "ALL";
  onRoleChange: (value: "USER" | "BUSINESS" | "ADMIN" | "ALL") => void;

  status: "ACTIVE" | "SUSPENDED" | "ALL";
  onStatusChange: (value: "ACTIVE" | "SUSPENDED" | "ALL") => void;

  verified: "true" | "false" | "ALL";
  onVerifiedChange: (value: "true" | "false" | "ALL") => void;
}

const UsersToolbar = ({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  verified,
  onVerifiedChange,
}: UsersToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, username or email..."
          className="w-full rounded-xl border border-zinc-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={role}
          onChange={(e) =>
            onRoleChange(
              e.target.value as "USER" | "BUSINESS" | "ADMIN" | "ALL",
            )
          }
          className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="ALL">All Roles</option>
          <option value="USER">User</option>
          <option value="BUSINESS">Business</option>
          <option value="ADMIN">Admin</option>
        </select>

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value as "ACTIVE" | "SUSPENDED" | "ALL")
          }
          className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        <select
          value={verified}
          onChange={(e) =>
            onVerifiedChange(e.target.value as "true" | "false" | "ALL")
          }
          className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="ALL">Verification</option>
          <option value="true">Verified</option>
          <option value="false">Not Verified</option>
        </select>

        <button className="flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-3 font-medium transition hover:bg-zinc-50">
          <Download size={18} />
          Export
        </button>
      </div>
    </div>
  );
};

export default UsersToolbar;
