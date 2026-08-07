interface PlaceStatusBadgeProps {
  status: "PENDING" | "APPROVED" | "REJECTED";
  isActive: boolean;
}

const PlaceStatusBadge = ({
  status,
  isActive,
}: PlaceStatusBadgeProps) => {
  if (!isActive) {
    return (
      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
        Inactive
      </span>
    );
  }

  switch (status) {
    case "APPROVED":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Approved
        </span>
      );

    case "PENDING":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Pending
        </span>
      );

    case "REJECTED":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Rejected
        </span>
      );
  }
};

export default PlaceStatusBadge;