interface PlaceStatsProps {
  statistics: {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
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
    title: "Approved",
    value: statistics.approved,
  },
  {
    title: "Pending",
    value: statistics.pending,
  },
  {
    title: "Rejected",
    value: statistics.rejected,
  },
  {
    title: "Inactive",
    value: statistics.inactive,
  },
];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
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