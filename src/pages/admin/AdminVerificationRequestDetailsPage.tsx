import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAdminVerificationRequest } from "../../hooks/useAdminVerificationRequest";
import VerificationUserCard from "../../components/admin/verification/VerificationUserCard";
import { useApproveVerificationRequest } from "../../hooks/useApproveVerificationRequest";
import { useRejectVerificationRequest } from "../../hooks/useRejectVerificationRequest";
import VerificationActionsCard from "../../components/admin/verification/VerificationActionsCard";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useState } from "react";

const AdminVerificationRequestDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const approveMutation = useApproveVerificationRequest();
  const rejectMutation = useRejectVerificationRequest();

  const [confirmType, setConfirmType] = useState<"approve" | "reject" | null>(
    null,
  );

  const { data, isLoading } = useAdminVerificationRequest(id);

  if (isLoading) {
    return (
      <div>
        <div className="p-10 text-center">Loading...</div>
      </div>
    );
  }

  const request = data;

  return (
    <div>
      <div className="space-y-6 pb-16">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition hover:bg-zinc-200"
          >
            ←
          </button>

          <div>
            <h1 className="text-2xl font-bold">Verification Request</h1>

            <p className="text-zinc-500">
              Review verification request details.
            </p>
          </div>
        </div>
        <VerificationUserCard request={request} />
        <VerificationActionsCard
          status={request.status}
          approving={approveMutation.isPending}
          rejecting={rejectMutation.isPending}
          onApprove={() => setConfirmType("approve")}
          onReject={() => setConfirmType("reject")}
        />
      </div>
      <ConfirmDialog
        open={confirmType !== null}
        title={
          confirmType === "approve"
            ? "Approve Verification"
            : "Reject Verification"
        }
        message={
          confirmType === "approve"
            ? "Are you sure you want to approve this verification request?"
            : "Are you sure you want to reject this verification request?"
        }
        confirmText={confirmType === "approve" ? "Approve" : "Reject"}
        loading={approveMutation.isPending || rejectMutation.isPending}
        onClose={() => setConfirmType(null)}
        onConfirm={() => {
          if (!request) return;

          if (confirmType === "approve") {
            approveMutation.mutate(request.id, {
              onSuccess: () => {
                setConfirmType(null);
              },
            });
          } else {
            rejectMutation.mutate(request.id, {
              onSuccess: () => {
                setConfirmType(null);
              },
            });
          }
        }}
      />
    </div>
  );
};

export default AdminVerificationRequestDetailsPage;
