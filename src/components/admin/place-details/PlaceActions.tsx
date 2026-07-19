import type { AdminPlaceDetails } from "../../../api/admin.api";
import { useAdminVerifyPlace } from "../../../hooks/useAdminVerifyPlace";
import { useAdminUpdatePlaceStatus } from "../../../hooks/useAdminUpdatePlaceStatus";
import { useAdminDeletePlace } from "../../../hooks/useAdminDeletePlace";
import { useState } from "react";
import ConfirmDialog from "../../common/ConfirmDialog";
import { useNavigate } from "react-router-dom";

interface PlaceActionsProps {
  place: AdminPlaceDetails;
}

const PlaceActions = ({ place }: PlaceActionsProps) => {
  const verifyMutation = useAdminVerifyPlace();
  const statusMutation = useAdminUpdatePlaceStatus();
  const deleteMutation = useAdminDeletePlace();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-zinc-900">Actions</h2>

      <div className="grid grid-cols-4 gap-5 items-center">
        <button
          onClick={() =>
            verifyMutation.mutate({
              id: place.id,
              isVerified: true,
            })
          }
          disabled={place.isVerified || verifyMutation.isPending}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {verifyMutation.isPending
            ? "Verifying..."
            : place.isVerified
              ? "Verified"
              : "Verify Place"}
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
