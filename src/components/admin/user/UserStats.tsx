import { Users, BadgeCheck, Shield, UserX } from "lucide-react";
import type { UsersStatistics } from "../../../api/admin.api";

interface UserStatsProps {
  statistics?: UsersStatistics;
}

const UserStats = ({ statistics }: UserStatsProps) => {
  const stats = [
    {
      title: "Total Users",
      value: statistics?.total ?? 0,
      icon: Users,
    },
    {
      title: "Verified Users",
      value: statistics?.verified ?? 0,
      icon: BadgeCheck,
    },
    {
      title: "Admins",
      value: statistics?.admins ?? 0,
      icon: Shield,
    },
    {
      title: "Suspended",
      value: statistics?.suspended ?? 0,
      icon: UserX,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
              </div>

              <div className="rounded-2xl bg-blue-50 p-3">
                <Icon size={26} className="text-blue-600" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStats;
