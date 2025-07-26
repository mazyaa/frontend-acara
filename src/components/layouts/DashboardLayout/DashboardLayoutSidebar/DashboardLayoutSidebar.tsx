interface SidebarItem {
    key: string;
    label: string;
    href: string;
    icon: JSX.Element;
}

interface PropTypes {
    sidebarItems: SidebarItem[];
    isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
    const { sidebarItems, isOpen } = props;
    return (
        <div>
            <div>Sidebar</div>
        </div>
    )
}

export default DashboardLayoutSidebar;
