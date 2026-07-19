import AdminPageHeader from "../../components/admin/AdminPageHeader";
import CategoryForm from "../../components/admin/category/CategoryForm";

const CreateCategoryPage = () => {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Create Category"
        description="Add a new place category."
      />

      <CategoryForm mode="create" />
    </div>
  );
};

export default CreateCategoryPage;