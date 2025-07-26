import { 
    CiGrid41,
    CiSettings,
    CiWallet,
    CiViewList,
    CiShoppingTag,
    CiBookmark
 } from "react-icons/ci"

const SIDEBAR_ADMIN = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        href: '/member/dashboard',
        icon: <CiGrid41 />,
    },
    {
        key: 'events',
        label: 'Events',
        href: '/admin/events',
        icon: <CiViewList />,
    },
    {
        key: 'category',
        label: 'Category',
        href: '/admin/category',
        icon: <CiShoppingTag />,
    },
    {
        key: 'banner',
        label: 'Banner',
        href: '/admin/banner',
        icon: <CiBookmark />,
    },
    {
        key: 'transactions',
        label: 'Transactions',
        href: '/member/transactions',
        icon: <CiWallet />,
    },
];

const SIDEBAR_MEMBERS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        href: '/member/dashboard',
        icon: <CiGrid41 />,
    },
    {
        key: 'settings',
        label: 'Settings',
        href: '/member/settings',
        icon: <CiSettings />,
    },
    {
        key: 'transactions',
        label: 'Transactions',
        href: '/member/transactions',
        icon: <CiWallet />,
    },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBERS };