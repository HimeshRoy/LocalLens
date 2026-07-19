import { useState } from "react";
import { useAdminPlaces } from "../../hooks/useAdminPlaces";
import PlaceStats from "../../components/admin/places/PlaceStats";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import PlacesFilters from "../../components/admin/places/PlacesFilters";
import PlacesTable from "../../components/admin/places/PlacesTable";
import { useDebounce } from "../../hooks/useDebounce";
import { useCategories } from "../../hooks/useCategories";

const PlacesPage = () => {
  const { data: categoriesData } = useCategories();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useAdminPlaces({
    search: debouncedSearch,
    categoryId: categoryId || undefined,
    status: status || undefined,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Places" description="Manage all added places." />

      <PlaceStats statistics={data.statistics} />

      <PlacesFilters
        search={search}
        categoryId={categoryId}
        status={status}
        categories={categoriesData?.data ?? []}
        onSearchChange={setSearch}
        onCategoryChange={setCategoryId}
        onStatusChange={setStatus}
      />
      <p className="text-sm text-zinc-500">
        Showing {data.places.length} of {data.pagination.totalItems} places
      </p>
      <PlacesTable places={data.places} />
    </div>
  );
};

export default PlacesPage;
