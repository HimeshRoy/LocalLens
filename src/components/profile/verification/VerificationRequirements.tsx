import { MapPinned, Star, CheckCircle2, Lock } from "lucide-react";

interface VerificationRequirementsProps {
  eligibility?: {
    approvedPlaces: number;
    reviewsCount: number;
    requiredPlaces: number;
    requiredReviews: number;
    eligible: boolean;
  };
}

const VerificationRequirements = ({
  eligibility,
}: VerificationRequirementsProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Become a Verified Local Contributor
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Verification is awarded to contributors who consistently add valuable
        places and reviews to the LocalLens community.
      </p>

      {eligibility && (
        <div className="mt-8 space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">Approved Places</span>

              <span className="text-sm font-semibold">
                {eligibility.approvedPlaces} / {eligibility.requiredPlaces}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${Math.min(
                    (eligibility.approvedPlaces / eligibility.requiredPlaces) *
                      100,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">Reviews</span>

              <span className="text-sm font-semibold">
                {eligibility.reviewsCount} / {eligibility.requiredReviews}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-amber-500 transition-all"
                style={{
                  width: `${Math.min(
                    (eligibility.reviewsCount / eligibility.requiredReviews) *
                      100,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-6">
        <div className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-5">
          <MapPinned className="text-blue-600" size={32} />

          <div>
            <h3 className="font-semibold">Add 50 Approved Places</h3>

            <p className="mt-1 text-sm text-zinc-500">
              Only places approved by the moderation team count toward
              verification.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-5">
          <Star className="text-amber-500" size={32} />

          <div>
            <h3 className="font-semibold">Write 100 Reviews</h3>

            <p className="mt-1 text-sm text-zinc-500">
              Share genuine and helpful reviews with the community.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-5">
          <CheckCircle2 className="text-green-600" size={32} />

          <div>
            <h3 className="font-semibold">Community Quality Check</h3>

            <p className="mt-1 text-sm text-zinc-500">
              Our moderators review your overall contribution quality before
              granting the verified badge.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-5">
          <Lock className="text-purple-600" size={32} />

          <div>
            <h3 className="font-semibold">One Active Request</h3>

            <p className="mt-1 text-sm text-zinc-500">
              You can have only one verification request under review at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationRequirements;
