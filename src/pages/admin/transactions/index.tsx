import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/admin/Transaction";

const TransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="Transaction page"
      type="admin"
    >
        <Transaction />
    </DashboardLayout>
  );
};

export default TransactionAdminPage;
