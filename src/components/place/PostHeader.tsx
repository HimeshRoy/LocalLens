import { formatDistanceToNow } from "date-fns";

interface PostHeaderProps {
  fullName: string;
  username: string;
  createdAt: string;
}

const PostHeader = ({ username, createdAt }: PostHeaderProps) => {
  return (
        <div>
          <div className="flex items-center justify-between text-zinc-500 p-4">
            <span className="font-semibold text-md text-gray-600">@{username}</span>

            <span className="text-sm">
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
  );
};

export default PostHeader;
