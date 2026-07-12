import { Link } from "react-router-dom";
import { useMyCollections } from "../../../hooks/useMyCollections";

interface CollectionsTabProps {
  collections?: any[];
  isOwner?: boolean;
}

const CollectionsTab = ({
  collections,
  isOwner = true,
}: CollectionsTabProps) => {
  const { data, isLoading } = useMyCollections(isOwner);
  const collectionList = isOwner ? (data?.data ?? []) : (collections ?? []);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-zinc-500">
        Loading collections...
      </div>
    );
  }

  if (!collectionList.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
        No collections yet.
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      {collectionList.map((collection: any) => (
        <Link
          to={`/collections/${collection.id}`}
          key={collection.id}
          className="block"
        >
          <div
            key={collection.id}
            className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <img
              src={
                collection.coverImage ||
                "https://placehold.co/600x300?text=Collection"
              }
              alt={collection.name}
              className="h-44 w-full object-cover"
            />

            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {collection.emoji} {collection.name}
                </h2>

                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs">
                  {collection.isPrivate ? "Private" : "Public"}
                </span>
              </div>

              {collection.description && (
                <p className="mt-3 line-clamp-2 text-sm text-zinc-500">
                  {collection.description}
                </p>
              )}

              <p className="mt-5 font-medium text-blue-600">
                {collection.placesCount} Places
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionsTab;
