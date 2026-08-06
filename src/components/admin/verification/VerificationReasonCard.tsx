interface VerificationReasonCardProps {
  reason: string | null;
}

const VerificationReasonCard = ({
  reason,
}: VerificationReasonCardProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Verification Reason
      </h2>

      <p className="whitespace-pre-wrap leading-7 text-zinc-600">
        {reason || "No reason was provided."}
      </p>
    </div>
  );
};

export default VerificationReasonCard;