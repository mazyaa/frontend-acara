import DataTable from "@/components/ui/DataTable";
import {
  Chip,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownActions from "@/components/commons/DropdownActions";
import useBanner from "./useBanner";
import { COLUMN_LIST_BANNER } from "./Banner.constants";
import AddBannerModal from "./AddBannerModal/AddBannerModal";

const Banner = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataBanner,
        isLoadingBanner,
        isRefetchingBanner,
        refetchBanners,
        // selectedId,
        setSelectedId,
  } = useBanner();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addBannerModal = useDisclosure(); // use for controlling modal open close
  const deleteBannerModal = useDisclosure();

  const renderCell = useCallback( // use useCallback works to optimize performance 
    // use useCallback to memoize the function, so it only re-created when dependencies change
    (banner: Record<string, unknown>, columnKey: Key) => {
      // Key = string | number
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image src={`${cellValue}`} alt="icon" width={300} height={200} className="rounded-lg" />
          );
        case "isShow":
          return (
            <Chip variant="flat" color={cellValue === true ? "primary" : "danger"}>
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          )
        case "actions":
          return (
            <DropdownActions
              detailNameDropdown={"Detail Banner"}
              keyDetailButton={"detail-banner-button"}
              keyDeleteButton={"delete-banner-button"}
              onPressDetailButton={() => push(`/admin/banner/${banner._id}`)}
              onPressDeleteButton={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
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
        buttonTopContenLabel="Create Banner"
        columns={COLUMN_LIST_BANNER}
        data={dataBanner?.data || []}
        emptyContent="No banner found"
        isLoading={isLoadingBanner || isRefetchingBanner}
        onClickButtonTopContent={() => {
        addBannerModal.onOpen();
        }} // open modal when button clicked use method from useDisclosure (onOpen)
        renderCell={renderCell}
        placeholderSearch="Search by Title"
        totalPages={dataBanner ? dataBanner.pagination.totalPages : 1} // default 1 if no data
      />
      )}
       <AddBannerModal
      {...addBannerModal}
      refetchBanners={refetchBanners}
      />

      {/*
      <DeleteBannerModal
      {...deleteBannerModal}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      refetchBanner={refetchBanner}
      /> */}
    </section>
  );
};

export default Banner;
