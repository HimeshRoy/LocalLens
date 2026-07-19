interface PlaceStatsProps {
  statistics: {
    total: number;
    verified: number;
    pending: number;
    inactive: number;
  };
}

const PlaceStats = ({ statistics }: PlaceStatsProps) => {
  const cards = [
    {
      title: "Total Places",
      value: statistics.total,
    },
    {
      title: "Verified",
      value: statistics.verified,
    },
    {
      title: "Pending",
      value: statistics.pending,
    },
    {
      title: "Inactive",
      value: statistics.inactive,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-zinc-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default PlaceStats;