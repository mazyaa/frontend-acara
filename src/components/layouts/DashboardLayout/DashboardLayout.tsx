import PageHead from "@/components/commons/pageHead";
import { ReactNode } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";

interface PropTypes {
    children?: ReactNode;
    title?: string;
}

const DashboardLayout = (props: PropTypes) => {
    const { children, title } = props;
    return (
       <>
         <PageHead title={title}/>
         <div>
            <DashboardLayoutSidebar />
            {children}
         </div>
       </>
    )
}

export default DashboardLayout;
