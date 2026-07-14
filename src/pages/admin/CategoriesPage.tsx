import { Plus } from "lucide-react";
import AdminToolbar from "../../components/admin/AdminToolbar";
import { useState } from "react";
import { useAdminCategories } from "../../hooks/useAdminCategories";
import CategoriesTable from "../../components/admin/CategoriesTable";

const CategoriesPage = () => {
  const { data, isLoading } = useAdminCategories();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data?.data);

  return (
    <div className="space-y-8">
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search categories..."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
            <Plus size={18} />
            Add Category
          </button>
        }
      />

      <CategoriesTable categories={data?.data ?? []} />
    </div>
  );
};

export default CategoriesPage;
