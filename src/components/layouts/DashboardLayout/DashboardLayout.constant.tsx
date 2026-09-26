import { 
    CiWallet,
    CiViewList,
    CiShoppingTag,
    CiBookmark,
    CiUser
 } from "react-icons/ci"

const SIDEBAR_ADMIN = [
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
        href: '/admin/transactions',
        icon: <CiWallet />,
    },
];

const SIDEBAR_MEMBERS = [
    {
        key: 'profile',
        label: 'Profile',
        href: '/member/profile',
        icon: <CiUser />,
    },
    {
        key: 'transactions',
        label: 'Transactions',
        href: '/member/transactions',
        icon: <CiWallet />,
    },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBERS };