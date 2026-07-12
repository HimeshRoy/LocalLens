import { Bot, Search } from "lucide-react";

const HomeHeader = () => {
  return (
    <div className="space-y-4 px-4 py-4">
      <button className="flex w-full items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3 text-left transition hover:border-blue-500">
        <Search size={20} className="text-zinc-500" />

        <span className="text-sm text-zinc-500">
          Search places, cafes, hotels...
        </span>
      </button>

      <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700">
        <Bot size={20} />

        <span>Ask LocalLens AI</span>
      </button>
    </div>
  );
};

export default HomeHeader;