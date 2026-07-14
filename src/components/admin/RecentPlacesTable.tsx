import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import UserBadge from "../common/UserBadge";

interface RecentPlacesTableProps {
  places: any[];
}

const RecentPlacesTable = ({
  places,
}: RecentPlacesTableProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-lg font-semibold">
          Recent Places
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-zinc-50">
            <tr className="text-left text-sm text-zinc-500">

              <th className="px-6 py-4">
                Place
              </th>

              <th className="px-6 py-4">
                Category
              </th>

              <th className="px-6 py-4">
                Added By
              </th>

              <th className="px-6 py-4">
                Created
              </th>

            </tr>
          </thead>

          <tbody>

            {places.map((place) => (
              <tr
                key={place.id}
                className="border-t border-zinc-100 hover:bg-zinc-50"
              >
                <td className="px-6 py-4">
                  <Link
                    to={`/places/${place.slug}`}
                    className="font-medium hover:text-blue-600"
                  >
                    {place.name}
                  </Link>

                  <p className="text-sm text-zinc-500">
                    {place.city}, {place.state}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {place.category.name}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <UserBadge
                    fullName={place.createdBy.fullName}
                    isVerified={false}
                  />

                  <p className="text-sm text-zinc-500">
                    @{place.createdBy.username}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-500">
                  {formatDistanceToNow(
                    new Date(place.createdAt),
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

export default RecentPlacesTable;