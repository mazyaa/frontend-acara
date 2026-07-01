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
import { useDeleteEventModal } from "./useDeleteEventModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvents: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>; // dispatch works for setState function (React useState)
}

export const DeleteEventModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchEvents,
    selectedId,
    setSelectedId,
  } = props;
  const {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessDeleteEvent,
  } = useDeleteEventModal();

  useEffect(() => {
    if (isSuccessDeleteEvent) {
      refetchEvents();
      onClose();
    }
  }, [isSuccessDeleteEvent]); // run useEffect when isSuccessDeleteEvent changes

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <p className="font-semibold">Delete Event</p>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p>Are you sure want to delete this Event?</p>
            </div>

            <ModalFooter>
              <div className="flex flex-row justify-end gap-3">
                <Button
                  className="font-medium text-danger-500"
                  variant="flat"
                    onPress={() => {
                      onClose();
                      setSelectedId("");
                    }}
                    disabled={isPendingMutateDeleteEvent}
                >
                  Cancel
                </Button>
                <Button
                  className="font-normal text-white"
                  color="danger"
                  type="submit"
                  onPress={() => mutateDeleteEvent(selectedId)}
                  disabled={isPendingMutateDeleteEvent}
                >
                  {isPendingMutateDeleteEvent ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    "Delete Event"
                  )}
                </Button>
              </div>
            </ModalFooter>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
