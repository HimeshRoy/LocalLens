interface DocumentPreviewCardProps {
  title: string;
  image: string | null;
}

const DocumentPreviewCard = ({
  title,
  image,
}: DocumentPreviewCardProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        {title}
      </h2>

      {image ? (
        <img
          src={image}
          alt={title}
          className="h-[450px] w-full rounded-2xl object-contain bg-zinc-100"
        />
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500">
          No image uploaded
        </div>
      )}
    </div>
  );
};

export default DocumentPreviewCard;