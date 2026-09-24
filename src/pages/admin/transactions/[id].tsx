import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/admin/DetailTransaction";

const DetailTransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Infromation for detail transaction"
      type="admin"
    >
        <DetailTransaction />
    </DashboardLayout>
  );
};

export default DetailTransactionAdminPage;
