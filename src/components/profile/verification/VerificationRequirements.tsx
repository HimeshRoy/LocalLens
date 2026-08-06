import { CheckCircle2, ShieldCheck, UserCheck, FileBadge2 } from "lucide-react";

const items = [
  {
    icon: UserCheck,
    title: "Authentic Account",
    description: "Your account should represent a real person or business.",
  },
  {
    icon: FileBadge2,
    title: "Government-issued ID",
    description: "Upload a valid government-issued identity document.",
  },
  {
    icon: ShieldCheck,
    title: "Complete Profile",
    description:
      "Make sure your profile photo, name and information are up to date.",
  },
  {
    icon: CheckCircle2,
    title: "One Active Request",
    description:
      "You can only have one verification request under review at a time.",
  },
];

const VerificationRequirements = () => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm mt-4">
      <h2 className="text-xl font-semibold">Before You Apply</h2>

      <p className="mt-2 text-sm text-zinc-500">
        Please review these requirements before submitting your request.
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl bg-zinc-50 p-4"
            >
                <Icon size={45} className="text-blue-600" />

              <div>
                <h3 className="font-medium">{item.title}</h3>

                <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationRequirements;
