import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { LIMIT_LISTS } from "@/constants/list.constants";
import useCategory from "./useCategory";

const Category = () => {
  const { push, isReady } = useRouter();
  const { setURL } = useCategory();

  useEffect(() => {
    setURL();
  }, []);

  const renderCell = useCallback(
    // use useCallback to memoize the function, so it only re-created when dependencies change
    (category: Record<string, unknown>, columnKey: Key) => {
      // Key = string | number
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => push(`/admin/category/${category.id}`)}
                >
                  Detail Catgeory
                </DropdownItem>
                <DropdownItem key="delete-category" className="text-danger-600">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      <DataTable
        buttonTopContenLabel="Create Category"
        columns={COLUMN_LIST_CATEGORY}
        currentPage={1}
        data={[
          {
            id: 1,
            icon: "/images/general/logo.png",
            name: "Category 1",
            description: "This is category 1",
          },
        ]}
        emptyContent="No category found"
        limit={LIMIT_LISTS[0].label}
        onChangeLimit={() => {}}
        onChangePage={() => {}}
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        onClickButtonTopContent={() => {}}
        renderCell={renderCell}
        totalPages={2}
      />
    </section>
  );
};

export default Category;
