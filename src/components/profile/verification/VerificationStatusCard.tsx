import { BadgeCheck, Clock3, XCircle, Shield } from "lucide-react";

export type VerificationStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

interface VerificationStatusCardProps {
  status: VerificationStatus;
}

const config = {
  NONE: {
    title: "Not Verified",
    description: "You haven't submitted a verification request yet.",
    icon: Shield,
    color: "text-zinc-500",
    bg: "bg-zinc-100",
  },

  PENDING: {
    title: "Verification Pending",
    description:
      "Your request is under review. We'll notify you once it's processed.",
    icon: Clock3,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },

  APPROVED: {
    title: "Verified",
    description: "Congratulations! Your account has been verified.",
    icon: BadgeCheck,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },

  REJECTED: {
    title: "Verification Rejected",
    description: "Your request wasn't approved. You can submit a new one.",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
};

const VerificationStatusCard = ({ status }: VerificationStatusCardProps) => {
  const item = config[status];
  const Icon = item.icon;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className={`rounded-2xl p-3 ${item.bg}`}>
          <Icon size={26} className={item.color} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">{item.title}</h2>

          <p className="mt-2 text-sm leading-7 text-zinc-500">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatusCard;
