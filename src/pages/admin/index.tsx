import DashboardLayout from "@/components/layouts/DashboardLayout"
import DashboardAdmin from "@/components/views/admin/DashboardAdmin"

const DashboardAdminPage = () => {
    return (
        <DashboardLayout title="Dashboard" description="dashboard page" type="admin">
            <DashboardAdmin />
        </DashboardLayout>
    )
}

export default DashboardAdminPage;