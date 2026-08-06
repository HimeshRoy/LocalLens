interface VerificationStatusBadgeProps {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const styles = {
  PENDING:
    "bg-amber-100 text-amber-700 border border-amber-200",

  APPROVED:
    "bg-green-100 text-green-700 border border-green-200",

  REJECTED:
    "bg-red-100 text-red-700 border border-red-200",
};

const labels = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const VerificationStatusBadge = ({
  status,
}: VerificationStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export default VerificationStatusBadge;