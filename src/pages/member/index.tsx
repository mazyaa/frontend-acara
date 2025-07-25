import DashboardLayout from "@/components/layouts/DashboardLayout"
import DashboardMember from "@/components/views/member/DashboardMember"

const DashboardMemberPage = () => {
    return (
        <DashboardLayout title="Dashboard Member">
            <DashboardMember />
        </DashboardLayout>
    )
}

export default DashboardMemberPage;