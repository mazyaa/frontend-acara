import InputFile from "@/components/ui/InputFile";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
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
import useAddEventModal from "./useAddEventModal";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/Event";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
}

const AddEventModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchEvent } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handelOnCLose,

    dataCategory,
    dataRegion,
    searchRegency,
    handleSearchRegency,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessMutateAddEvent]);

  const disabledSubmit =
    isPendingMutateAddEvent ||
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
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader>
            <h3>Add Event</h3>
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
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="slug"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Slug"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                />

                <Controller
                  name="category"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      className="rounded"
                      defaultItems={dataCategory?.data.data || []}
                      variant="bordered"
                      label="Category"
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(value) => onChange(value)} // onChange is coming from react hook form for setting value to form
                      placeholder="Select Category"
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={category._id}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />

                <Controller
                  name="startDate"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Start Date"
                      hideTimeZone
                      showMonthAndYearPickers
                      isInvalid={errors.startDate !== undefined}
                      errorMessage={errors.startDate?.message}
                    />
                  )}
                />

                <Controller
                  name="endDate"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="End Date"
                      hideTimeZone
                      showMonthAndYearPickers
                      isInvalid={errors.endDate !== undefined}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                />

                <Controller
                  name="isPublish"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Status"
                      isInvalid={errors.isPublish !== undefined}
                      errorMessage={errors.isPublish?.message}
                    >
                      <SelectItem key="true">Publish</SelectItem>
                      <SelectItem key="false">Draft</SelectItem>
                    </Select>
                  )}
                />

                <Controller
                  name="isFeatured"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Featured"
                      isInvalid={errors.isFeatured !== undefined}
                      errorMessage={errors.isFeatured?.message}
                    >
                      <SelectItem key="true">Yes</SelectItem>
                      <SelectItem key="false">No</SelectItem>
                    </Select>
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
                <p className="text-sm font-bold">Location</p>
                <Controller
                  name="region"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      className="rounded"
                      defaultItems={dataRegion?.data.data || []}
                      variant="bordered"
                      label="City"
                      onInputChange={(search) => handleSearchRegency(search)} // for searching region by name, it will call api to get region data
                      isInvalid={errors.region !== undefined}
                      errorMessage={errors.region?.message}
                      onSelectionChange={(value) => onChange(value)} // onChange is coming from react hook form for setting value to form
                      placeholder="Search City Here..."
                    >
                      {(regency: IRegency) => (
                        <AutocompleteItem key={regency.id}>
                          {regency.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />

                <Controller
                  name="latitude"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Latitude"
                      isInvalid={errors.latitude !== undefined}
                      errorMessage={errors.latitude?.message}
                    />
                  )}
                />

                <Controller
                  name="longitude"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Longitude"
                      isInvalid={errors.longitude !== undefined}
                      errorMessage={errors.longitude?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Controller
                  name="banner"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field: { onChange, value, ...field } }) => (
                    <InputFile
                      {...field} // inject some propperties like onChange, value, name, ref from react hook form to Input component because by default some properties like onChange and value are not connected to react hook form
                      onDelete={() => handleDeleteBanner(onChange)} // onChange is coming from react hook form for setting value to form
                      onUpload={(files) => handleUploadBanner(files, onChange)} // params files is coming from handleOnUpload in InputFile component, onChange is coming from react hook form for setting value to form
                      isUploading={isPendingMutateUploadFile}
                      isDeleting={isPendingMutateDeleteFile}
                      isInvalid={errors.banner !== undefined} // show input error state if have error
                      errorMessage={errors.banner?.message}
                      preview={typeof preview === "string" ? preview : ""}
                      label={<p className="my-2 text-sm font-bold">Banner</p>}
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
                    {isPendingMutateAddEvent ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      "Create Event"
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

export default AddEventModal;
