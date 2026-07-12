import { useState } from "react";

interface FeedContentProps {
  place: any;
}

const FeedContent = ({ place }: FeedContentProps) => {
  const [expanded, setExpanded] = useState(false);
  const description = place.description ?? "";

  const isLong = description.length > 50;

  const displayText =
    expanded || !isLong ? description : `${description.slice(0, 50)}...`;
  return (
    <div className="px-5 pt-1">
      <h2 className="text-lg text-zinc-900 flex gap-2">
        {place.name}
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
            <span>{place.category.icon}</span>

            <span>{place.category.name}</span>
          </span>
        </div>
      </h2>
      <p className="text-sm leading-6 text-zinc-700">
        {displayText}

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="ml-1 font-medium text-blue-600 hover:underline"
          >
            {expanded ? "less" : "more"}
          </button>
        )}
      </p>
    </div>
  );
};

export default FeedContent;
