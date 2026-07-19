import { useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import UsersTable from "../../components/admin/user/UsersTable";
import UserStats from "../../components/admin/user/UserStats";
import UsersToolbar from "../../components/admin/user/UsersToolbar";
import { useAdminUsers } from "../../hooks/useAdminUsers";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"USER" | "BUSINESS" | "ADMIN" | "ALL">(
    "ALL",
  );
  const [status, setStatus] = useState<"ACTIVE" | "SUSPENDED" | "ALL">("ALL");
  const [verified, setVerified] = useState<"true" | "false" | "ALL">("ALL");

  const { data, isLoading } = useAdminUsers({
    search: search || undefined,
    role: role === "ALL" ? undefined : role,
    status: status === "ALL" ? undefined : status,
    verified: verified === "ALL" ? undefined : verified,
  });
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Users"
        description="Manage all registered users."
      />
      <UserStats statistics={data?.data.statistics} />
      <UsersToolbar
        search={search}
        onSearchChange={setSearch}
        role={role}
        onRoleChange={setRole}
        status={status}
        onStatusChange={setStatus}
        verified={verified}
        onVerifiedChange={setVerified}
      />
      {!isLoading && <UsersTable users={data?.data.users ?? []} />}
    </div>
  );
};

export default UsersPage;
