interface VerificationActionsCardProps {
  onApprove: () => void;
  onReject: () => void;

  approving?: boolean;
  rejecting?: boolean;

  status: "PENDING" | "APPROVED" | "REJECTED";
}

const VerificationActionsCard = ({
  onApprove,
  onReject,
  approving = false,
  rejecting = false,
  status,
}: VerificationActionsCardProps) => {
  if (status !== "PENDING") return null;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Review Decision
      </h2>

      <div className="grid grid-cols-4 gap-4">
        <button
          onClick={onApprove}
          disabled={approving || rejecting}
          className="flex-1 rounded-2xl  border border-green-300 py-3 font-semibold text-green-600 hover:bg-green-200 disabled:opacity-60"
        >
          {approving ? "Approving..." : "Approve"}
        </button>

        <button
          onClick={onReject}
          disabled={approving || rejecting}
          className="flex-1 rounded-2xl border border-red-600 py-3 font-semibold text-red-600 hover:bg-red-200 disabled:opacity-60"
        >
          {rejecting ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default VerificationActionsCard;