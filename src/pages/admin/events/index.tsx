import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/admin/event";


const EventPage = () => {
  return (
    <DashboardLayout
      title="Event oi"
      description="List of all Events, create new event, and manage existing events"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
};

export default EventPage;
