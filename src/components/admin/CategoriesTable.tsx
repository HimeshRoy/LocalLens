import { BadgeCheck, BadgeX } from "lucide-react";
import RowActions from "./RowActions";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";
import { toast } from "react-toastify";
import ConfirmDialog from "../common/ConfirmDialog";
import { useState } from "react";
interface CategoriesTableProps {
  categories: any[];
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const navigate = useNavigate();
  const deleteCategory = useDeleteCategory();

  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleDelete = () => {
    if (!selectedCategory) return;

    deleteCategory.mutate(selectedCategory.id, {
      onSuccess: () => {
        toast.success("Category deleted successfully.");

        setSelectedCategory(null);
      },

      onError: (error: any) => {
        toast.error(
          error.response?.data?.message ?? "Failed to delete category.",
        );
      },
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-zinc-50">
          <tr className="text-left text-sm text-zinc-500">
            <th className="px-6 py-4">Icon</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Slug</th>
            <th className="px-6 py-4">Places</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t border-zinc-100 hover:bg-zinc-50"
            >
              <td className="px-6 py-4 text-2xl">{category.icon ?? "📁"}</td>

              <td className="px-6 py-4 font-medium">{category.name}</td>

              <td className="px-6 py-4 text-zinc-500">{category.slug}</td>

              <td className="px-6 py-4">{category._count?.places ?? 0}</td>

              <td className="px-6 py-4">
                {category.isActive ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
                    <BadgeCheck size={16} />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm text-red-700">
                    <BadgeX size={16} />
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <RowActions
                  isActive={category.isActive}
                  onEdit={() =>
                    navigate(`/admin/categories/${category.id}/edit`)
                  }
                  onDelete={() => setSelectedCategory(category)}
                  onToggle={() => console.log("Toggle", category.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        open={!!selectedCategory}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleteCategory.isPending}
        onClose={() => setSelectedCategory(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default CategoriesTable;
