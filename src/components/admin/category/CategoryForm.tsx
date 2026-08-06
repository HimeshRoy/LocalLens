import { useState, useEffect } from "react";
import { categoryIcons } from "../../../data/categoryIcons";
import slugify from "slugify";
import { useUpdateCategory } from "../../../hooks/useUpdateCategory";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AdminCategory } from "../../../api/admin-category.api";
import { useCreateCategory } from "../../../hooks/useCreateCategory";
import { validateCategory } from "../../../utils/validateCategory";

interface CategoryFormProps {
  mode: "create" | "edit";
  category?: AdminCategory;
}

const CategoryForm = ({ mode, category }: CategoryFormProps) => {
  const navigate = useNavigate();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: slugify(prev.name, {
        lower: true,
        strict: true,
        trim: true,
      }),
    }));
  }, [form.name]);

  useEffect(() => {
    if (mode !== "edit" || !category) return;

    setForm({
      name: category.name,
      slug: category.slug,
      icon: category.icon ?? "",
      description: category.description ?? "",
      isActive: category.isActive,
    });
  }, [mode, category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCategory({
      name: form.name,
      icon: form.icon,
    });

    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    try {
      if (mode === "create") {
        await createCategory.mutateAsync({
          name: form.name,
          description: form.description,
          icon: form.icon,
        });

        toast.success("Category created successfully.");
      }

      if (mode === "edit" && category) {
        await updateCategory.mutateAsync({
          id: category.id,
          data: {
            name: form.name,
            description: form.description,
            icon: form.icon,
            isActive: form.isActive,
          },
        });

        toast.success("Category updated successfully.");
      }

      navigate("/admin/categories");
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Something went wrong.");
    }
  };

  return (
    <form
      className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-3 items-start gap-6 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Category Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Slug</label>

          <input
            value={form.slug}
            disabled
            className="w-full rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-500 cursor-not-allowed"
          />

          <p className="mt-2 text-xs text-zinc-500">
            Automatically generated from the category name.
          </p>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium">
            Category Icon
          </label>

          <div className="grid grid-cols-6 gap-3">
            {categoryIcons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    icon,
                  }))
                }
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl transition ${
                  form.icon === icon
                    ? "border-blue-600 bg-blue-50"
                    : "border-zinc-200 hover:border-blue-300"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <h3 className="mb-4 font-semibold">Live Preview</h3>

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
            {form.icon || " "}
          </div>

          <div>
            <h4 className="font-semibold text-lg">
              {form.name || "Category Name"}
            </h4>

            <p className="text-sm text-zinc-500">
              {form.slug || "category-slug"}
            </p>

            <p className="mt-1 text-sm text-zinc-600">
              {form.description || "Category description..."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <button
          type="button"
          className="rounded-xl border border-zinc-200 px-6 py-3 font-medium hover:bg-zinc-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          disabled={createCategory.isPending || updateCategory.isPending}
        >
          {mode === "create"
            ? createCategory.isPending
              ? "Creating..."
              : "Create Category"
            : updateCategory.isPending
              ? "Saving..."
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
