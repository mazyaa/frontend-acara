import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    isPendingMutateAddFile,
  } = useAddCategoryModal();
  return (
    <Modal isOpen={isOpen} placement="center" scrollBehavior="inside">
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>
            <h3 className="">Add Category</h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold">Infromation</p>
                <Controller 
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      className="rounded"
                      variant="bordered"
                      label="Name"
                      type="text"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                
                <Controller 
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Description"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold">Icon</p>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field : { onChange, value, ...field}}) => (
                    <InputFile 
                      {...field}
                      onChange={(e) => {
                        onChange(e.currentTarget.files ? e.currentTarget.files[0] : null);
                      }}
                      isInvalid={errors.icon !== undefined}
                      errorMessage={errors.icon?.message}
                    />
                  )}
                />
              </div>

              <ModalFooter>
                <div className="flex flex-row justify-end gap-3">
                  <Button 
                    className="font-medium text-danger-500"
                    variant="flat"
                    onPress={onClose}
                    disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
                    >
                    Cancel
                  </Button>
                  <Button 
                    className="font-medium text-white" 
                    color="danger"
                    type="submit"
                    disabled={isSuccessMutateAddCategory || isPendingMutateAddFile}
                  >
                    {isPendingMutateAddCategory || isPendingMutateAddFile ? (
                      <Spinner size="sm" color="white"/>
                    ): "Create Category"}
                  </Button>
                </div>
              </ModalFooter>
            </div>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
