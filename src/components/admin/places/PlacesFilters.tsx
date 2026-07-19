interface PlacesFiltersProps {
  search: string;
  categoryId: string;
  status: string;

  categories: {
    id: string;
    name: string;
  }[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const PlacesFilters = ({
  search,
  onSearchChange,
  onStatusChange,
  categories,
  categoryId,
  onCategoryChange,
}: PlacesFiltersProps) => {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm grid grid-cols-3 gap-6">
      <input
        type="text"
        placeholder="Search places..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-blue-500"
      />
      <select
        value={categoryId}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-xl border border-zinc-200 px-4 py-3"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-xl border border-zinc-200 px-4 py-3"
      >
        <option value="">All Status</option>
        <option value="VERIFIED">Verified</option>
        <option value="PENDING">Pending</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>
  );
};

export default PlacesFilters;
