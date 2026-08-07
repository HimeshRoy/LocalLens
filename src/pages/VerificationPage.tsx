import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import VerificationRequirements from "../components/profile/verification/VerificationRequirements";
import VerificationForm from "../components/profile/verification/VerificationForm";
import { useProfile } from "../hooks/useProfile";
import VerificationStatusCard, {
  type VerificationStatus,
} from "../components/profile/verification/VerificationStatusCard";
import { useVerificationEligibility } from "../hooks/useVerificationEligibility";

const VerificationPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useVerificationEligibility();
  const { data: profileData } = useProfile();

  const profile = profileData?.data;
  const eligibility = data?.data;
  const verificationStatus: VerificationStatus = profile?.isVerified
    ? "APPROVED"
    : eligibility?.alreadyApplied
      ? "PENDING"
      : "NONE";

  if (isLoading) {
    return (
      <MainLayout>
        <div className="text-center flex items-center justify-center min-h-full">
          Loading..
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-black transition hover:bg-zinc-200"
          >
            ←
          </button>

          <div>
            <h1 className="text-2xl font-bold">Account Verification</h1>

            <p className="text-sm text-zinc-500">
              Become a verified LocalLens contributor.
            </p>
          </div>
        </div>

        <VerificationStatusCard status={verificationStatus} />

        <VerificationRequirements eligibility={eligibility} />

        {verificationStatus === "NONE" &&
          eligibility?.eligible &&
          !eligibility?.alreadyApplied && <VerificationForm />}
      </div>
    </MainLayout>
  );
};

export default VerificationPage;
