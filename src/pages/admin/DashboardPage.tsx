import {
  Users,
  Building2,
  MapPinned,
  Star,
  Heart,
  Folder,
  FolderTree,
  Tags,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import AdminStatCard from "../../components/admin/AdminStatCard";
import RecentUsersTable from "../../components/admin/RecentUsersTable";
import RecentPlacesTable from "../../components/admin/RecentPlacesTable";
import RecentReviewsTable from "../../components/admin/RecentReviewsTable";
import QuickActions from "../../components/admin/QuickActions";

const DashboardPage = () => {
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div className="text-red-500">Failed to load dashboard.</div>;
  }

  const stats = data.data.statistics;

  return (
    <div className="space-y-8">

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <AdminStatCard
          title="Users"
          color="from-blue-500 to-indigo-600"
          value={stats.users}
          icon={Users}
        />

        <AdminStatCard
          title="Businesses"
          value={stats.businesses}
          icon={Building2}
          color="from-cyan-500 to-sky-600"
        />

        <AdminStatCard
          title="Places"
          value={stats.places}
          icon={MapPinned}
          color="from-green-500 to-emerald-600"
        />

        <AdminStatCard
          title="Reviews"
          value={stats.reviews}
          icon={Star}
          color="from-yellow-400 to-orange-500"
        />

        <AdminStatCard
          title="Favorites"
          value={stats.favorites}
          icon={Heart}
          color="from-pink-500 to-rose-500"
        />

        <AdminStatCard
          title="Collections"
          value={stats.collections}
          icon={Folder}
          color="from-violet-500 to-purple-600"
        />

        <AdminStatCard
          title="Categories"
          value={stats.categories}
          icon={FolderTree}
          color="from-indigo-500 to-blue-600"
        />

        <AdminStatCard
          title="Tags"
          value={stats.tags}
          icon={Tags}
          color="from-orange-500 to-red-500"
        />

       <AdminStatCard
  title="Approved Places"
  value={stats.approvedPlaces}
  icon={ShieldCheck}
  color="from-emerald-500 to-green-600"
/>

<AdminStatCard
  title="Pending Places"
  value={stats.pendingPlaces}
  icon={Clock3}
  color="from-yellow-500 to-amber-600"
/>

<AdminStatCard
  title="Rejected Places"
  value={stats.rejectedPlaces}
  icon={MapPinned}
  color="from-red-500 to-rose-600"
/>

        <AdminStatCard
          title="Pending Claims"
          value={stats.pendingClaims}
          icon={Clock3}
          color="from-amber-400 to-orange-500"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentUsersTable users={data.data.recentUsers} />
        </div>

        <QuickActions />
      </div>

      <div className="mt-6">
        <RecentPlacesTable places={data.data.recentPlaces} />
      </div>

      <div className="mt-6">
        <RecentReviewsTable reviews={data.data.recentReviews} />
      </div>
    </div>
  );
};

export default DashboardPage;
