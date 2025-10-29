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
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const { currentPage, currentLimit, currentSearch, setURL, dataCategory, handleChangeLimit, handleChangePage, handleClearSearch, handleSearch, isLoadingCategory, isRefetchingCategory } = useCategory();
  console.log(dataCategory);

  useEffect(() => {
    setURL();
  }, []);

  const renderCell = useCallback(
    // use useCallback to memoize the function, so it only re-created when dependencies change
    (category: Record<string, unknown>, columnKey: Key) => {
      // Key = string | number
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
        //   );
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
      {Object.keys(query).length > 0 && (
        <DataTable
        buttonTopContenLabel="Create Category"
        columns={COLUMN_LIST_CATEGORY}
        currentPage={Number(currentPage) || 1}
        data={dataCategory?.data || []}
        emptyContent="No category found"
        isLoading={isLoadingCategory || isRefetchingCategory}
        limit={String(currentLimit)}
        onChangeLimit={handleChangeLimit}
        onChangePage={handleChangePage}
        onChangeSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onClickButtonTopContent={() => {}}
        renderCell={renderCell}
        totalPages={dataCategory ? dataCategory.pagination.totalPages : 1}
      />
      )}
      <AddCategoryModal isOpen={true} />
    </section>
  );
};

export default Category;
