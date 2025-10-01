import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/admin/category";

const CategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      description="List of all Cartegory, create new categories, and manage existing categoies"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
};

export default CategoryPage;
