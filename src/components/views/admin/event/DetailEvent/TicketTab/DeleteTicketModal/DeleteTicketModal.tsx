import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDeleteTicketModal } from "./useDeleteTicketModal";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTickets: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>; // dispatch works for setState function (React useState)
}

export const DeleteTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTickets,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;
  const {
    mutateDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessDeleteTicket,
  } = useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessDeleteTicket) {
      refetchTickets();
      onClose();
    }
  }, [isSuccessDeleteTicket]); // run useEffect when isSuccessDeleteTicket changes

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <p className="font-semibold">Delete Ticket</p>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p>Are you sure want to delete this Ticket?</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row justify-end gap-3">
            <Button
              className="font-medium text-danger-500"
              variant="flat"
              onPress={() => {
                onClose();
                setSelectedDataTicket(null); // reset selectedDataTicket to null when modal is closed
              }}
              disabled={isPendingMutateDeleteTicket}
            >
              Cancel
            </Button>
            <Button
              className="font-normal text-white"
              color="danger"
              type="submit"
              onPress={() =>
                mutateDeleteTicket(selectedDataTicket?._id as string)
              }
              disabled={isPendingMutateDeleteTicket}
            >
              {isPendingMutateDeleteTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Delete Ticket"
              )}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;
