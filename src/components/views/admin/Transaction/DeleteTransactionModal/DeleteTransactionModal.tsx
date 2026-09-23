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
import { useDeleteTransactionModal } from "./useDeleteTransactionModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTransactions: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>; // dispatch works for setState function (React useState)
}

export const DeleteTransactionModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTransactions,
    selectedId,
    setSelectedId,
  } = props;
  const {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessDeleteTransaction,
  } = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessDeleteTransaction) {
      refetchTransactions();
      onClose();
    }
  }, [isSuccessDeleteTransaction]); // run useEffect when isSuccessDeleteTransaction changes

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <p className="font-semibold">Delete Transaction</p>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p>Are you sure want to delete this transaction?</p>
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
                setSelectedId("");
              }}
              disabled={isPendingMutateDeleteTransaction}
            >
              Cancel
            </Button>
            <Button
              className="font-normal text-white"
              color="danger"
              type="submit"
              onPress={() => mutateDeleteTransaction(selectedId)}
              disabled={isPendingMutateDeleteTransaction}
            >
              {isPendingMutateDeleteTransaction ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Delete Transaction"
              )}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTransactionModal;
