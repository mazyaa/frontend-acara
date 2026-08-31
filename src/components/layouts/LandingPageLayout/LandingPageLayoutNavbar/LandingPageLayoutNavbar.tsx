import {
  Avatar,
  Button,
  ButtonProps,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Listbox,
  ListboxItem,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { NAV_ITEMS, BUTTON_ITEMS } from "../LandingPageLayout.constant";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";
import { IEvent } from "@/types/Event";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const {
    dataProfile,
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,
    handleSearch,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();

  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex" justify="start">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn("font-medium text-default-700 hover:text-danger", {
                "font-bold text-danger-500": router.pathname === item.href,
              })}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarContent justify="end">
        <NavbarMenuToggle className="flex lg:hidden" />

        <NavbarItem className="hidden lg:relative lg:flex">
          <Input
            isClearable
            className="w-[300px]"
            placeholder="Search Event"
            startContent={<CiSearch />}
            onClear={() => setSearch("")}
            onChange={handleSearch}
          />

          {search !== "" && (
            <Listbox
              items={dataEventsSearch?.data || []}
              className="ronded-xl absolute right-0 top-12 border bg-white"
            >
              {!isRefetchingEventsSearch && !isLoadingEventsSearch ? (
                (item: IEvent) => (
                  <ListboxItem key={item._id} href={`/event/${item.slug}`}>
                    <div className="flex items-center gap-2">
                      <Image
                      src={
                        item.banner || "/images/general/banner-placeholder.png"
                      }
                      alt={`${item.name} Banner`}
                      className="w-2/5 rounded-md"
                      width={100}
                      height={40}
                    />

                    <p className="w-3/5 text-wrap">{item.name}</p>
                    </div>
                  </ListboxItem>
                )
              ) : (
                <ListboxItem key="loading">
                  <Spinner color="danger" size="sm" className="mx-auto" />
                </ListboxItem>
              )}
            </Listbox>
          )}
        </NavbarItem>

        {session.status === "authenticated" ? (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger className="hidden lg:flex">
                <Avatar
                  src={
                    dataProfile?.profilePicture ||
                    "/images/general/avatar-placeholder.png"
                  }
                  alt={"User Avatar"}
                  className="cursor-pointer"
                  showFallback // Show fallback image if the src is not available
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/dashboard"
                  className={cn({
                    hidden: dataProfile?.role !== "admin",
                  })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  href="/member/profile"
                  className={cn({
                    hidden: false,
                  })}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="signout"
                  onPress={() => signOut()}
                  className={cn({
                    hidden: false,
                  })}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden gap-4 lg:flex">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`button-${item.label}`}>
                <Button
                  as={Link}
                  href={item.href}
                  color="danger"
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}

        {/* Mobile Menu */}
        <NavbarMenu className="gap-4">
          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem key={`nav-${item.label}`}>
              <Link
                href={item.href}
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    "font-bold text-danger-500": router.pathname === item.href,
                  },
                )}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    hidden: dataProfile?.role !== "admin",
                  },
                )}
              >
                <Link href="/admin/dashboard">Admin</Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="font-medium text-default-700 hover:text-danger">
                <Link href="/member/profile">Profile</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  color="danger"
                  onPress={() => signOut()}
                  className="mt-2 w-full"
                  variant="bordered"
                  size="sm"
                >
                  Log Out
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            <Fragment>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    href={item.href}
                    color="danger"
                    className="mt-2 w-full"
                    variant={item.variant as ButtonProps["variant"]}
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              ))}
            </Fragment>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
