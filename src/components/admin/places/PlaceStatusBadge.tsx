interface PlaceStatusBadgeProps {
  isVerified: boolean;
  isActive: boolean;
}

const PlaceStatusBadge = ({
  isVerified,
  isActive,
}: PlaceStatusBadgeProps) => {
  if (!isActive) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Inactive
      </span>
    );
  }

  if (isVerified) {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        Verified
      </span>
    );
  }

  return (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
      Pending
    </span>
  );
};

export default PlaceStatusBadge;