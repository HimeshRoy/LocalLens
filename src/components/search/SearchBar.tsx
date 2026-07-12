import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search places..."
        className="w-full rounded-2xl border border-zinc-200 py-3 pl-12 pr-12 outline-none transition focus:border-blue-500"
      />

      {value && (
        <button title="search"
          type="button"
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;