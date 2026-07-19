import { useParams } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import CategoryForm from "../../components/admin/category/CategoryForm";
import { useAdminCategory } from "../../hooks/useAdminCategory";

const EditCategoryPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useAdminCategory(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Edit Category"
        description="Update category information."
      />
      <CategoryForm mode="edit" category={data?.data} />
    </div>
  );
};

export default EditCategoryPage;
