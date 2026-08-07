import type { AdminPlace } from "../../../api/admin.api";
import Avatar from "../../common/Avatar";
import PlaceStatusBadge from "./PlaceStatusBadge";
import RowActions from "../RowActions";
import { useState } from "react";
import ConfirmDialog from "../../common/ConfirmDialog";
import { useApprovePlace } from "../../../hooks/useApprovePlace";
import { useRejectPlace } from "../../../hooks/useRejectPlace";
import { useAdminUpdatePlaceStatus } from "../../../hooks/useAdminUpdatePlaceStatus";
import { useDeletePlace } from "../../../hooks/useDeletePlace";
import { Link } from "react-router-dom";

interface PlacesTableProps {
  places: AdminPlace[];
}

const PlacesTable = ({ places }: PlacesTableProps) => {
  const [selectedPlace, setSelectedPlace] = useState<AdminPlace | null>(null);

  const [action, setAction] = useState<
    "approve" | "reject" | "status" | "delete" | null
  >(null);

  const { mutate: approvePlace, isPending: approvePending } = useApprovePlace();

  const { mutate: rejectPlace, isPending: rejectPending } = useRejectPlace();

  const { mutate: updatePlaceStatus, isPending: statusPending } =
    useAdminUpdatePlaceStatus();

  const { mutate: deletePlace, isPending: deletePending } = useDeletePlace();

  const handleConfirmAction = () => {
    if (!selectedPlace || !action) return;

    switch (action) {
      case "approve":
        approvePlace(selectedPlace.id);
        break;

      case "reject":
        rejectPlace(selectedPlace.id);
        break;

      case "status":
        updatePlaceStatus({
          id: selectedPlace.id,
          isActive: !selectedPlace.isActive,
        });
        break;

      case "delete":
        deletePlace(selectedPlace.id);
        break;
    }

    setSelectedPlace(null);
    setAction(null);
  };

  if (places.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold">No places found</h3>

        <p className="mt-2 text-zinc-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-zinc-50">
          <tr className="text-left text-sm font-semibold text-zinc-600">
            <th className="px-6 py-4">Place</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Owner</th>
            <th className="px-6 py-4">Rating</th>
            <th className="px-6 py-4">Reviews</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Joined</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place) => (
            <tr
              key={place.id}
              className="border-t border-zinc-100 hover:bg-zinc-50"
            >
              <td className="px-6 py-4">
                <Link to={`/admin/places/${place.id}`}>
                  <div className="flex items-center gap-3">
                    <Avatar image={place.coverImage} name={place.name} />

                    <div>
                      <p className="font-semibold">{place.name}</p>

                      <p className="text-sm text-zinc-500">
                        {place.city}, {place.state}
                      </p>
                    </div>
                  </div>
                </Link>
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-zinc-100 px-3 text-center py-1 text-xs font-semibold flex flex-col">
                  {place.category.icon} {place.category.name}
                </span>
              </td>

              <td className="px-6 py-4">
                <div>
                  <p className="font-medium">{place.createdBy.fullName}</p>

                  <p className="text-sm text-zinc-500">
                    @{place.createdBy.username}
                  </p>
                </div>
              </td>

              <td className="px-6 py-4 ">{place.averageRating.toFixed(1)}</td>

              <td className="px-6 py-4">{place._count.reviews}</td>

              <td className="px-6 py-4">
                <PlaceStatusBadge
                  status={place.status}
                  isActive={place.isActive}
                />
              </td>

              <td className="px-6 py-4">
                {new Date(place.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-right">
                <td className="px-6 py-4 text-right">
                  <RowActions
                    isActive={place.isActive}
                    status={place.status}
                    onApprove={() => {
                      setSelectedPlace(place);
                      setAction("approve");
                    }}
                    onReject={() => {
                      setSelectedPlace(place);
                      setAction("reject");
                    }}
                    onToggle={() => {
                      setSelectedPlace(place);
                      setAction("status");
                    }}
                    onDelete={() => {
                      setSelectedPlace(place);
                      setAction("delete");
                    }}
                    toggleLabel={place.isActive ? "Deactivate" : "Activate"}
                    deleteLabel="Delete Place"
                  />
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={!!action}
        onClose={() => {
          setAction(null);
          setSelectedPlace(null);
        }}
        onConfirm={handleConfirmAction}
        loading={
          approvePending || rejectPending || statusPending || deletePending
        }
        title={
          action === "approve"
            ? "Approve Place"
            : action === "reject"
              ? "Reject Place"
              : action === "status"
                ? selectedPlace?.isActive
                  ? "Deactivate Place"
                  : "Activate Place"
                : "Delete Place"
        }
        message={
          action === "delete"
            ? "This action cannot be undone."
            : "Are you sure?"
        }
      />
    </div>
  );
};

export default PlacesTable;
