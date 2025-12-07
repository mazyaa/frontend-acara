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
import { useEffect } from "react";
import { on } from "events";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCategory } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,

    preview,
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handelOnCLose
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateAddCategory]);

  const disabledSubmit =
    isPendingMutateAddCategory ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handelOnCLose(onClose)}
    >
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
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
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

                <Controller // use Controller for connect custom input component with react hook form and inject some propertie like onChange, value, name, ref to input component
                  name="description" // shout use name propeerty because it will be used as key in form data
                  control={control} // an property from Controller for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Textarea
                      {...field} // for inject some propperties like onChange, value, name, ref from react hook form to Input component, so Input component can be controlled by react hook form because by default some properties like onChange and value are not connected to react hook form
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
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field: { onChange, value, ...field } }) => (
                    <InputFile
                      {...field} // inject some propperties like onChange, value, name, ref from react hook form to Input component because by default some properties like onChange and value are not connected to react hook form
                      onDelete={() => handleDeleteIcon(onChange)} // onChange is coming from react hook form for setting value to form
                      onUpload={(files) => handleUploadIcon(files, onChange)} // params files is coming from handleOnUpload in InputFile component, onChange is coming from react hook form for setting value to form
                      isUploading={isPendingMutateUploadFile}
                      isDeleting={isPendingMutateDeleteFile}
                      isInvalid={errors.icon !== undefined} // show input error state if have error
                      errorMessage={errors.icon?.message}
                      preview={typeof preview === "string" ? preview : ""}
                      isDropable
                    />
                  )}
                />
              </div>

              <ModalFooter>
                <div className="flex flex-row justify-end gap-3">
                  <Button
                    className="font-medium text-danger-500"
                    variant="flat"
                    onPress={() => handelOnCLose(onClose)}
                    disabled={disabledSubmit}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="font-medium text-white"
                    color="danger"
                    type="submit"
                    disabled={disabledSubmit}
                  >
                    {isPendingMutateAddCategory ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      "Create Category"
                    )}
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
