import type { AdminVerificationRequest } from "../../../api/admin.api";
import Avatar from "../../common/Avatar";
import VerificationStatusBadge from "./VerificationStatusBadge";
import { Link } from "react-router-dom";

interface VerificationRequestsTableProps {
  requests: AdminVerificationRequest[];
}

const VerificationRequestsTable = ({
  requests,
}: VerificationRequestsTableProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-zinc-50">
          <tr className="text-left text-sm font-semibold text-zinc-600">
            <th className="px-6 py-4">User</th>

            <th className="px-6 py-4">Status</th>

            <th className="px-6 py-4">Submitted</th>

            <th className="px-6 py-4 text-right">View</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr
              key={request.id}
              className="border-t border-zinc-100 hover:bg-zinc-50"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    image={request.user.avatar}
                    name={request.user.fullName}
                  />

                  <div>
                    <p className="font-semibold">{request.user.fullName}</p>

                    <p className="text-sm text-zinc-500">
                      @{request.user.username}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <VerificationStatusBadge status={request.status} />
              </td>

              <td className="px-6 py-4">
                {new Date(request.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-right">
                <Link
                  to={`/admin/verification-requests/${request.id}`}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  View →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationRequestsTable;
