import { Home, Search, Map as MapIcon, Plus, Sparkles, User, LogOut, LogIn } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/map", icon: MapIcon, label: "Explore Map" },
    { to: "/places/new", icon: Plus, label: "Add Place" },
    { to: "/ai", icon: Sparkles, label: "AI Guide" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-zinc-200 bg-white p-6 md:flex">
      <div className="mb-10 flex items-center gap-3">
        <span className="text-2xl font-bold text-blue-600"><a href="/">LocalLens</a></span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-4 py-3.5 font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-blue-600"
                }`
              }
            >
              <Icon size={22} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-zinc-100 pt-6">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={22} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <LogIn size={22} />
            Login
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;