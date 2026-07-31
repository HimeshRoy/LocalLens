import { Home, Search, Plus, Sparkles, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
  const navItems = [
    {
      to: "/",
      icon: Home,
      label: "Home",
    },
    {
      to: "/search",
      icon: Search,
      label: "Search",
    },
    {
      to: "/places/new",
      icon: Plus,
      label: "Add",
    },
    {
      to: "/ai",
      icon: Sparkles,
      label: "AI",
    },
    {
      to: "/profile",
      icon: User,
      label: "Profile",
    },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-24px)] max-w-md -translate-x-1/2 md:hidden">
      <div className="clay-sm flex h-16 items-center justify-around rounded-full px-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-zinc-500 hover:text-blue-600"
                }`
              }
            >
              <Icon size={22} />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
