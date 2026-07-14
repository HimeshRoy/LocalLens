import { formatDistanceToNow } from "date-fns";
import UserBadge from "../common/UserBadge";

interface RecentUsersTableProps {
  users: any[];
}

const RecentUsersTable = ({
  users,
}: RecentUsersTableProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">

      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-lg font-semibold">
          Recent Users
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-50">

            <tr className="text-left text-sm text-zinc-500">

              <th className="px-6 py-4">
                User
              </th>

              <th className="px-6 py-4">
                Role
              </th>

              <th className="px-6 py-4">
                Joined
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-zinc-100 hover:bg-zinc-50"
              >

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        user.avatar ??
                        "https://placehold.co/100x100?text=U"
                      }
                      alt={user.fullName}
                      className="h-11 w-11 rounded-full object-cover"
                    />

                    <div>

                      <UserBadge
                        fullName={user.fullName}
                        isVerified={false}
                      />

                      <p className="text-sm text-zinc-500">
                        @{user.username}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-4">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {user.role}
                  </span>

                </td>

                <td className="px-6 py-4 text-sm text-zinc-500">

                  {formatDistanceToNow(
                    new Date(user.createdAt),
                    {
                      addSuffix: true,
                    },
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentUsersTable;