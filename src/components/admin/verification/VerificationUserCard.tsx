import Avatar from "../../common/Avatar";
import type { AdminVerificationRequest } from "../../../api/admin.api";

interface VerificationUserCardProps {
  request: AdminVerificationRequest;
}

const VerificationUserCard = ({ request }: VerificationUserCardProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">User Information</h2>

      <div className="flex items-center gap-5">
        <Avatar
          image={request.user.avatar}
          name={request.user.fullName}
          size={70}
        />

        <div>
          <h3 className="text-lg font-semibold">{request.user.fullName}</h3>

          <p className="text-zinc-500">@{request.user.username}</p>

          <p className="mt-2 text-sm text-zinc-500">{request.user.email}</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-zinc-50 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">
            {request.approvedPlaces}
          </p>

          <p className="mt-1 text-sm text-zinc-500">Approved Places</p>
        </div>

        <div className="rounded-2xl bg-zinc-50 p-4 text-center">
          <p className="text-3xl font-bold text-amber-500">
            {request.reviewsCount}
          </p>

          <p className="mt-1 text-sm text-zinc-500">Reviews</p>
        </div>

        <div className="rounded-2xl bg-zinc-50 p-4 text-center">
          <p
            className={`text-lg font-bold ${
              request.eligible ? "text-green-600" : "text-red-600"
            }`}
          >
            {request.eligible ? "Eligible" : "Not Eligible"}
          </p>

          <p className="mt-1 text-sm text-zinc-500">Verification</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="flex justify-between">
          <span className="text-zinc-500">Joined</span>

          <span className="font-medium">
            {new Date(request.user.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-zinc-500">Current Status</span>

          <span
            className={`font-semibold ${
              request.user.isVerified ? "text-green-600" : "text-zinc-700"
            }`}
          >
            {request.user.isVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerificationUserCard;
