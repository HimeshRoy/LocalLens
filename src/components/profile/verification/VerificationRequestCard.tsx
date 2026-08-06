import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { VerificationRequest } from "../../../api/verification-request.api";

interface VerificationRequestCardProps {
  request: VerificationRequest;
}

const config = {
  PENDING: {
    icon: Clock3,
    color: "text-amber-600",
    bg: "bg-amber-100",
    title: "Verification Pending (May take few days)",
  },

  APPROVED: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-100",
    title: "Verification Approved",
  },

  REJECTED: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    title: "Verification Rejected",
  },
};

const VerificationRequestCard = ({
  request,
}: VerificationRequestCardProps) => {
  const item = config[request.status];
  const Icon = item.icon;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm mt-4">
      <div className="flex items-start gap-4">
        <div className={`rounded-2xl p-3 ${item.bg}`}>
          <Icon
            size={24}
            className={item.color}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            {item.title}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Submitted on{" "}
            {new Date(request.createdAt).toLocaleDateString()}
          </p>

          {request.reason && (
            <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
              <p className="text-sm font-medium text-zinc-700">
                Reason
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                {request.reason}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationRequestCard;