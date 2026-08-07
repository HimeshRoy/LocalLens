import { useCreateVerificationRequest } from "../../../hooks/useCreateVerificationRequest";

const VerificationForm = () => {
  const { mutate, isPending } = useCreateVerificationRequest();

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Apply for Verification
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        You've met the contribution requirements. Submit your application for
        review by the LocalLens moderation team.
      </p>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm text-blue-700">
          Your profile, approved places, and reviews will be reviewed before a
          verification badge is granted.
        </p>
      </div>

      <button
        type="button"
        onClick={() => mutate()}
        disabled={isPending}
        className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? "Submitting..."
          : "Apply for Verification"}
      </button>
    </div>
  );
};

export default VerificationForm;