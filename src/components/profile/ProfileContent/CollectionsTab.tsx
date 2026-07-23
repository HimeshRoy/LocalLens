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
    return <div className="py-10 text-center text-zinc-500">Loading...</div>;
  }

  if (!collectionList.length) {
    return (
      <div className="py-20 text-center text-zinc-500">No collections yet.</div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 mt-4">
      {collectionList.map((collection: any) => (
        <Link
          to={`/collections/${collection.id}`}
          key={collection.id}
          className="group relative block aspect-square bg-zinc-100 rounded-2xl"
        >
          <img
            src={
              collection.coverImage ||
              "https://placehold.co/400x400?text=Collection"
            }
            alt={collection.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />

          <div className="absolute bottom-2 left-2 right-2 text-white">
            <h2 className="font-semibold truncate leading-tight flex items-center gap-1">
              <span>{collection.emoji}</span>
              <span className="truncate">{collection.name}</span>
            </h2>
            <p className="mt-0.5 text-[10px] font-medium opacity-90">
              {collection.placesCount} places
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionsTab;
