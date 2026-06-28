import DataTable from "@/components/ui/DataTable";
import {
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownActions from "@/components/commons/DropdownActions";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();
  console.log(dataCategory);

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addCategoryModal = useDisclosure(); // use for controlling modal open close
  const deleteCategoryModal = useDisclosure();

  const renderCell = useCallback( // use useCallback works to optimize performance 
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
            <DropdownActions
              keyDetailButton={"detail-category-button"}
              keyDeleteButton={"delete-category-button"}
              onPressDetailButton={() => push(`/admin/category/${category._id}`)}
              onPressDeleteButton={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
              }}
            />
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
        data={dataCategory?.data || []}
        emptyContent="No category found"
        isLoading={isLoadingCategory || isRefetchingCategory}
        onClickButtonTopContent={() => {
        addCategoryModal.onOpen();
        }} // open modal when button clicked use method from useDisclosure (onOpen)
        renderCell={renderCell}
        totalPages={dataCategory ? dataCategory.pagination.totalPages : 1} // default 1 if no data
      />
      )}
      <AddCategoryModal
      {...addCategoryModal}
      refetchCategory={refetchCategory}
      />
      <DeleteCategoryModal
      {...deleteCategoryModal}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      refetchCategory={refetchCategory}
      />
    </section>
  );
};

export default Category;
