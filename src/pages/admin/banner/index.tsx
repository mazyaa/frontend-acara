import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/admin/banner";

const BannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      description="List of all Banner, create new banners, and manage existing banners."
      type="admin"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default BannerPage;
