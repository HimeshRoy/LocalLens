interface AvatarProps {
  image?: string | null;
  name: string;
  size?: number;
}

const Avatar = ({
  image,
  name,
  size = 44,
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        style={{
          width: size,
          height: size,
        }}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-semibold text-white"
    >
      {initials}
    </div>
  );
};

export default Avatar;