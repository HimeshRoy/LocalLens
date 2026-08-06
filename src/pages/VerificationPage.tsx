import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import VerificationRequirements from "../components/profile/verification/VerificationRequirements";
import VerificationForm from "../components/profile/verification/VerificationForm";
import { useMyVerificationRequests } from "../hooks/useMyVerificationRequests";
import { useProfile } from "../hooks/useProfile";
import VerificationStatusCard, {
  type VerificationStatus,
} from "../components/profile/verification/VerificationStatusCard";
import VerificationRequestCard from "../components/profile/verification/VerificationRequestCard";

const VerificationPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useMyVerificationRequests();
  const requests = data?.data ?? [];
  const { data: profileData } = useProfile();

  const profile = profileData?.data;

  const latestRequest = requests[0];
  const verificationStatus: VerificationStatus = profile?.isVerified
    ? "APPROVED"
    : ((latestRequest?.status as VerificationStatus | undefined) ?? "NONE");

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
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-black transition hover:bg-zinc-200"
          >
            ←
          </button>

          <div>
            <h1 className="text-2xl font-bold">Account Verification</h1>

            <p className="text-sm text-zinc-500">
              Request a verified badge for your LocalLens account.
            </p>
          </div>
        </div>

        <VerificationStatusCard status={verificationStatus} />
        <VerificationRequirements />
        {latestRequest && verificationStatus !== "NONE" ? (
          <VerificationRequestCard request={latestRequest} />
        ) : null}
        {verificationStatus === "NONE" || verificationStatus === "REJECTED" ? (
          <VerificationForm />
        ) : null}
      </div>
    </MainLayout>
  );
};

export default VerificationPage;
