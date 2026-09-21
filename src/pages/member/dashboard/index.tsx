import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardMember from "@/components/views/Member/DashboardMember";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="dashboard page"
      type="member"
    >
      <DashboardMember />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
