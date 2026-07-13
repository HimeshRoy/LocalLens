const FeedSkeleton = () => {
  return (
    <article className="animate-pulse border-b border-zinc-200 bg-white pb-8">

      <div className="flex items-center gap-3 px-5 py-4">
        <div className="h-12 w-12 rounded-full bg-zinc-200" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-36 rounded bg-zinc-200" />
          <div className="h-3 w-24 rounded bg-zinc-200" />
          <div className="h-3 w-32 rounded bg-zinc-200" />
        </div>

        <div className="h-3 w-16 rounded bg-zinc-200" />
      </div>

      <div className="aspect-[4/3] w-full bg-zinc-200" />

      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex gap-5">
          <div className="h-6 w-6 rounded-full bg-zinc-200" />
          <div className="h-6 w-6 rounded-full bg-zinc-200" />
          <div className="h-6 w-6 rounded-full bg-zinc-200" />
        </div>

        <div className="h-6 w-6 rounded-full bg-zinc-200" />
      </div>

      <div className="space-y-3 px-5 pt-5">
        <div className="h-4 w-40 rounded bg-zinc-200" />
        <div className="h-4 w-full rounded bg-zinc-200" />
        <div className="h-4 w-4/5 rounded bg-zinc-200" />
      </div>
    </article>
  );
};

export default FeedSkeleton;