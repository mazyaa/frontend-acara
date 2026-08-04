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
import { useDeleteBannerModal } from "./useDeleteBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>; // dispatch works for setState function (React useState)
}

export const DeleteBannerModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = props;
  const {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessDeleteBanner,
  } = useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessDeleteBanner) {
      refetchBanner();
      onClose();
    }
  }, [isSuccessDeleteBanner]); // run useEffect when isSuccessDeleteBanner changes

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <p className="font-semibold">Delete Banner</p>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p>Are you sure want to delete this banner?</p>
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
              disabled={isPendingMutateDeleteBanner}
            >
              Cancel
            </Button>
            <Button
              className="font-normal text-white"
              color="danger"
              type="submit"
              onPress={() => mutateDeleteBanner(selectedId)}
              disabled={isPendingMutateDeleteBanner}
            >
              {isPendingMutateDeleteBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Delete Banner"
              )}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
