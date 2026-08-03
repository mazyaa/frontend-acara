import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useAddBannerModal from "./useAddBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanners: () => void;
}

const AddBannerModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchBanners } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handelOnCLose,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessMutateAddBanner) {
      onClose();
      refetchBanners();
    }
  }, [isSuccessMutateAddBanner]);

  const disabledSubmit =
    isPendingMutateAddBanner ||
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
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>
            <h3>Add Banner</h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold">Infromation</p>

                <Controller
                  name="title"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      className="rounded"
                      variant="bordered"
                      label="Title"
                      isInvalid={errors.title !== undefined}
                      errorMessage={errors.title?.message}
                    />
                  )}
                />

                <Controller
                  name="isShow"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Status"
                      isInvalid={errors.isShow !== undefined}
                      errorMessage={errors.isShow?.message}
                    >
                      <SelectItem key="true">Show</SelectItem>
                      <SelectItem key="false">Hide</SelectItem>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Controller
                  name="image"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field: { onChange, value, ...field } }) => (
                    <InputFile
                      {...field} // inject some propperties like onChange, value, name, ref from react hook form to Input component because by default some properties like onChange and value are not connected to react hook form
                      onDelete={() => handleDeleteImage(onChange)} // onChange is coming from react hook form for setting value to form
                      onUpload={(files) => handleUploadImage(files, onChange)} // params files is coming from handleOnUpload in InputFile component, onChange is coming from react hook form for setting value to form
                      isUploading={isPendingMutateUploadFile}
                      isDeleting={isPendingMutateDeleteFile}
                      isInvalid={errors.image !== undefined} // show input error state if have error
                      errorMessage={errors.image?.message}
                      preview={typeof preview === "string" ? preview : ""}
                      label={<p className="my-2 text-sm font-bold">Image</p>}
                      isDropable
                    />
                  )}
                />
              </div>
            </div>
          </ModalBody>
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
                {isPendingMutateAddBanner ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Create Banner"
                )}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
