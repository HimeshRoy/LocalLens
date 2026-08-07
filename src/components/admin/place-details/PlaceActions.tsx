import type { AdminPlaceDetails } from "../../../api/admin.api";
import { useApprovePlace } from "../../../hooks/useApprovePlace";
import { useRejectPlace } from "../../../hooks/useRejectPlace";
import { useAdminUpdatePlaceStatus } from "../../../hooks/useAdminUpdatePlaceStatus";
import { useAdminDeletePlace } from "../../../hooks/useAdminDeletePlace";
import { useState } from "react";
import ConfirmDialog from "../../common/ConfirmDialog";
import { useNavigate } from "react-router-dom";

interface PlaceActionsProps {
  place: AdminPlaceDetails;
}

const PlaceActions = ({ place }: PlaceActionsProps) => {
  const approveMutation = useApprovePlace();
const rejectMutation = useRejectPlace();
  const statusMutation = useAdminUpdatePlaceStatus();
  const deleteMutation = useAdminDeletePlace();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-zinc-900">Actions</h2>

      <div className="grid grid-cols-4 gap-5 items-center">
        <button
  onClick={() => approveMutation.mutate(place.id)}
  disabled={
    place.status === "APPROVED" || approveMutation.isPending
  }
  className="w-full rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {approveMutation.isPending
    ? "Approving..."
    : place.status === "APPROVED"
      ? "Approved"
      : "Approve Place"}
</button>

<button
  onClick={() => rejectMutation.mutate(place.id)}
  disabled={
    place.status === "REJECTED" || rejectMutation.isPending
  }
  className="w-full rounded-xl bg-orange-600 px-4 py-3 font-medium text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {rejectMutation.isPending
    ? "Rejecting..."
    : place.status === "REJECTED"
      ? "Rejected"
      : "Reject Place"}
</button>

        <button
          onClick={() =>
            statusMutation.mutate({
              id: place.id,
              isActive: !place.isActive,
            })
          }
          disabled={statusMutation.isPending}
          className="w-full rounded-xl bg-zinc-800 px-4 py-3 font-medium text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {statusMutation.isPending
            ? "Updating..."
            : place.isActive
              ? "Deactivate Place"
              : "Activate Place"}
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Delete Place
        </button>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete Place"
        message={`Are you sure you want to delete "${place.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteMutation.isPending}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          deleteMutation.mutate(place.id, {
            onSuccess: () => {
              setShowDeleteConfirm(false);
              navigate("/admin/places");
            },
          });
        }}
      />
    </div>
  );
};

export default PlaceActions;
