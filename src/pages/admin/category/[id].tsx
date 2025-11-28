import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/admin/category/DetailCategory";

const DetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Event"
      description="Manage Information for this event."
      type="admin"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default DetailCategoryPage;
