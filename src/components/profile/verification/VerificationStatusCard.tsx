import { BadgeCheck, Clock3, XCircle, Shield } from "lucide-react";

export type VerificationStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

interface VerificationStatusCardProps {
  status: VerificationStatus;
}

const config = {
  NONE: {
    title: "Become a Verified Contributor",
    description:
      "Contribute more approved places and reviews to become eligible for verification.",
    icon: Shield,
    color: "text-zinc-600",
    bg: "bg-zinc-100",
  },

  PENDING: {
    title: "Application Under Review",
    description:
      "Your verification request has been received. Our moderators are reviewing your contributions.",
    icon: Clock3,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },

  APPROVED: {
    title: "Verified Contributor",
    description:
      "Congratulations! Your contributions have earned you a verified badge.",
    icon: BadgeCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },

  REJECTED: {
    title: "Application Rejected",
    description:
      "Your application wasn't approved this time. Continue contributing and apply again later.",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
};

const VerificationStatusCard = ({ status }: VerificationStatusCardProps) => {
  const item = config[status];
  const Icon = item.icon;

  return (
    <div className={`rounded-3xl border p-6 ${item.bg}`}>
      <div className="flex items-start gap-5">
        <div className={`rounded-2xl p-4 ${item.bg}`}>
          <Icon size={36} className={item.color} />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold">{item.title}</h2>

          <p className="mt-2 text-sm leading-7 text-zinc-600">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatusCard;
