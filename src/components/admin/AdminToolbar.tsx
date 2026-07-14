import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface AdminToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  action?: ReactNode;
}

const AdminToolbar = ({
  search,
  onSearchChange,
  placeholder = "Search...",
  action,
}: AdminToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 outline-none transition focus:border-blue-500"
        />

      </div>

      {action}

    </div>
  );
};

export default AdminToolbar;