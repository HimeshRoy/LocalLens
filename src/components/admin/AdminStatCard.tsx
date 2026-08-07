import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
}

const AdminStatCard = ({
  title,
  value,
  icon: Icon,
  color = "from-blue-500 to-blue-600",
}: AdminStatCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br ${color} opacity-10 blur-3xl`}
      />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-zinc-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {typeof value === "number"
              ? value.toLocaleString()
              : value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color}`}
        >
          <Icon
            size={20}
            className="text-white"
          />
        </div>

      </div>

    </div>
  );
};

export default AdminStatCard;