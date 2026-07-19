import { FolderPlus, Tags, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add Category",
    description: "Create a new category",
    icon: FolderPlus,
    to: "/admin/categories/new",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Add Tag",
    description: "Create a new tag",
    icon: Tags,
    to: "/admin/tags/new",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Manage Users",
    description: "View all users",
    icon: Users,
    to: "/admin/users",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Business Claims",
    description: "Review pending claims",
    icon: ShieldCheck,
    to: "/admin/claims",
    color: "from-violet-500 to-purple-600",
  },
];

const QuickActions = () => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>

      <div className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group flex items-center justify-between rounded-2xl border border-zinc-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color}`}
                >
                  <Icon size={22} className="text-white" />
                </div>

                <div>
                  <h3 className="font-semibold">{action.title}</h3>

                  <p className="text-sm text-zinc-500">{action.description}</p>
                </div>
              </div>

              <ArrowRight
                size={18}
                className="text-zinc-400 transition group-hover:translate-x-1"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
