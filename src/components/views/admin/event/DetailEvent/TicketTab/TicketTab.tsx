import DropdownActions from "@/components/commons/DropdownActions";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment, Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LIST_TICKET } from "./ticket.constants";
import useTicketTab from "./useTicktetTab";
import AddTicketModal from "./AddTicketModal/AddTicketModal";
import { ITicket } from "@/types/Ticket";
import DeleteTicketModal from "./DeleteTicketModal";

const TicketTab = () => {
  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const addTicketModal = useDisclosure(); // use for controlling modal open close
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(null);

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      // Key = string | number
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownActions
              onPressDetailButton={() => {
                updateTicketModal.onOpen();
              }}
              onPressDeleteButton={() => {
                setSelectedDataTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
              }}
              detailNameDropdown="Update Ticket"
              keyDetailButton="update-ticket"
              keyDeleteButton="delete-ticket"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );
  return (
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader className="items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Event Ticket</h1>
            <p className="text-sm text-default-400">
              Manage Ticket of this event
            </p>
          </div>
          <Button color="danger" onPress={() => addTicketModal.onOpen()}>
            Add New Ticket
          </Button>
        </CardHeader>

        <CardBody>
          <DataTable
            columns={COLUMN_LIST_TICKET}
            data={dataTicket || []}
            emptyContent="No Ticket found"
            isLoading={isPendingTicket || isRefetchingTicket}
            renderCell={renderCell}
            showSearch={false}
            showLimit={false}
            totalPages={1}
          />

          <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />
          <DeleteTicketModal 
            {...deleteTicketModal}
            refetchTickets={refetchTicket}
            selectedDataTicket={selectedDataTicket}
            setSelectedDataTicket={setSelectedDataTicket}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default TicketTab;
