import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_EVENT } from "./event.constant";
import useEvent from "./useEvent";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownActions from "@/components/commons/DropdownActions";
import AddEventModal from "./AddEventModal/AddEventModal";
import DeleteEventModal from "./DeleteEventModal";

const Event = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,

    selectedId,
    setSelectedId,
  } = useEvent();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addEventModal = useDisclosure(); // use for controlling modal open close
  const deleteEventModal = useDisclosure();

  const renderCell = useCallback(
    // use useCallback works to optimize performance
    // use useCallback to memoize the function, so it only re-created when dependencies change
    (event: Record<string, unknown>, columnKey: Key) => {
      // Key = string | number
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-56 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "isPublish":
          return (
            <Chip
              className={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownActions
              keyDetailButton={"detail-event-button"}
              keyDeleteButton={"delete-event-button"}
              onPressDetailButton={() => push(`/admin/event/${event._id}`)}
              onPressDeleteButton={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
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
          buttonTopContenLabel="Create Event"
          columns={COLUMN_LIST_EVENT}
          data={dataEvents?.data || []}
          emptyContent="No Events found"
          isLoading={isLoadingEvents || isRefetchingEvents}
          onClickButtonTopContent={() => {
            addEventModal.onOpen();
          }} // open modal when button clicked use method from useDisclosure (onOpen)
          renderCell={renderCell}
          totalPages={dataEvents ? dataEvents.pagination.totalPages : 1} // default 1 if no data
        />
      )}
      <AddEventModal {...addEventModal} refetchEvent={refetchEvents} />
      <DeleteEventModal
        {...deleteEventModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchEvents={refetchEvents}
      />
    </section>
  );
};

export default Event;
