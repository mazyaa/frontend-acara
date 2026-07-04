import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/admin/category/DetailCategory";

const DetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Category"
      description="Manage Information for this category."
      type="admin"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default DetailCategoryPage;
