import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { useAdminVerificationRequests } from "../../hooks/useAdminVerificationRequests";
import VerificationRequestsTable from "../../components/admin/verification/VerificationRequestsTable";

const AdminVerificationRequestsPage = () => {
  const { data, isLoading } = useAdminVerificationRequests();

  if (isLoading) {
    return (
      <div>
        <div className="p-10 text-center">Loading verification requests...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <AdminPageHeader
          title="Verification Requests"
          description="Review and manage account verification requests."
        />
      </div>
      <VerificationRequestsTable requests={data ?? []} />
    </div>
  );
};

export default AdminVerificationRequestsPage;
