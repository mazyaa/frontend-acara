import PageHead from "@/components/commons/pageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBERS } from "./DashboardLayout.constant";

interface PropTypes {
  children?: ReactNode;
  title?: string;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, title, type = "admin" } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead title={title} />
      <div>
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBERS}
          isOpen={open}
        />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
