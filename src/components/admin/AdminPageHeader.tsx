import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const AdminPageHeader = ({
  title,
  description,
  action,
}: AdminPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">{title}</h1>

        <p className="mt-2 text-zinc-500">{description}</p>
      </div>

      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
};

export default AdminPageHeader;
