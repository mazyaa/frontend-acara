import PageHead from "@/components/commons/pageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBERS } from "./DashboardLayout.constant";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, title, description, type = "admin" } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBERS}
          isOpen={open}
        />

        <div className="h-screen w-full overflow-y-auto p-8">
          {/* Navbar for the mobile view */}
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="text-small mb-5">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
