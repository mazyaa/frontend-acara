import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const DeleteCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCategory } = props;

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
                //   onPress={() => handelOnCLose(onClose)}
                //   disabled={disabledSubmit}
                >
                  Cancel
                </Button>
                <Button
                  className="font-normal text-white"
                  color="danger"
                  type="submit"
                  // disabled={disabledSubmit}
                >
                  {/* {isPendingMutateAddCategory ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    "Create Category"
                  )} */}
                  Delete Category
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
