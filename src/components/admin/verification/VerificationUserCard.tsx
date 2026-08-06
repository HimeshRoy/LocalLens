import Avatar from "../../common/Avatar";
import type { AdminVerificationRequest } from "../../../api/admin.api";

interface VerificationUserCardProps {
  request: AdminVerificationRequest;
}

const VerificationUserCard = ({
  request,
}: VerificationUserCardProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        User Information
      </h2>

      <div className="flex items-center gap-5">
        <Avatar
          image={request.user.avatar}
          name={request.user.fullName}
          size={70}
        />

        <div>
          <h3 className="text-lg font-semibold">
            {request.user.fullName}
          </h3>

          <p className="text-zinc-500">
            @{request.user.username}
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            {request.user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationUserCard;