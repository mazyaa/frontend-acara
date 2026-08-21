import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
    { label: "Register", href: "/auth/register", variant: "bordered" },
    { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
    { label: "Facebook", href: "https://www.facebook.com/", icon: <FaFacebook /> },
    { label: "Instagram", href: "https://www.instagram.com/", icon: <FaInstagram /> },
    { label: "TikTok", href: "https://www.tiktok.com/", icon: <FaTiktok /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: <FaLinkedin /> },
]

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };