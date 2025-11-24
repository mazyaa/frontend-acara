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
import { useDeleteCategoryModal } from "./useDeleteCategoryModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>; // dispatch works for setState function (React useState)
}

export const DeleteCategoryModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = props;
  const {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessDeleteCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessDeleteCategory) {
      refetchCategory();
      onClose();
    }
  }, [isSuccessDeleteCategory]); // run useEffect when isSuccessDeleteCategory changes

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <p className="font-semibold">Delete Category</p>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p>Are you sure want to delete this category?</p>
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
                    disabled={isPendingMutateDeleteCategory}
                >
                  Cancel
                </Button>
                <Button
                  className="font-normal text-white"
                  color="danger"
                  type="submit"
                  onPress={() => mutateDeleteCategory(selectedId)}
                  disabled={isPendingMutateDeleteCategory}
                >
                  {isPendingMutateDeleteCategory ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    "Delete Category"
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

export default DeleteCategoryModal;
