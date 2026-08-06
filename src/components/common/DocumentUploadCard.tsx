import { UploadCloud } from "lucide-react";
import { useRef } from "react";

interface DocumentUploadCardProps {
  title: string;
  description: string;

  image?: string | null;

  onChange: (file: File) => void;

  onRemove?: () => void;
}

const DocumentUploadCard = ({
  title,
  description,
  image,
  onChange,
  onRemove,
}: DocumentUploadCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="cursor-pointer rounded-2xl border-2 border-dashed border-zinc-200 p-6 transition hover:border-blue-400 hover:bg-blue-50/40"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onChange(file);
          }
        }}
      />
      {image ? (
        <div className="text-center">
          <img
            src={image}
            alt={title}
            className="mx-auto h-52 w-full max-w-sm rounded-2xl object-cover"
          />

          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              Replace
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
              className="rounded-xl border border-red-200 px-5 py-2 text-red-600 transition hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-around gap-3">
          <div className="flex flex-col ">
            <h3 className="mt-4 text-md font-semibold">{title}</h3>
            <p className="mt-2 max-w-sm text-sm text-zinc-500">{description}</p>
          </div>

          <div className="rounded-2xl bg-blue-100 p-4">
            <UploadCloud className="text-blue-600" size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadCard;
