import {
  LayoutDashboard,
  Users,
  FolderTree,
  LogOut,
  MapPin,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    name: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    name: "Categories",
    icon: FolderTree,
    path: "/admin/categories",
  },
  {
    name: "Places",
    path: "/admin/places",
    icon: MapPin,
  },
  // {
  //   name: "Tags",
  //   icon: Tags,
  //   path: "/admin/tags",
  //   status: "active"
  // },
];

const AdminSidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col bg-white clay">
      <div className="border-b border-b-zinc-200 p-6">
        <h1 className="text-2xl font-bold text-blue-600">LocalLens</h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`
              }
            >
              <Icon size={20} />

              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
