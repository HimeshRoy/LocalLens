import { Bell } from "lucide-react";
import { useMyProfile } from "../../hooks/useMyProfile";
import UserBadge from "../common/UserBadge";

const AdminTopbar = () => {
  const { data } = useMyProfile();

  const user = data?.data;
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : hour < 21
          ? "Good Evening"
          : "Good Night";

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between bg-white px-8 clay">
      <div>
        <h1 className="text-2xl font-bold">
          {greeting},{" "}
          <span className="text-blue-600">{user?.fullName.split(" ")[0]}</span>
        </h1>

        <p className="text-sm text-zinc-500">{today}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || "https://placehold.co/100x100?text=A"}
            alt=""
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="hidden md:block">
            <UserBadge
              fullName={user?.fullName ?? ""}
              isVerified={user?.isVerified}
            />

            <p className="text-sm text-zinc-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
