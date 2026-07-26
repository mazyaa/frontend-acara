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
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useAddTicketModal from "./useAddTicketModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
}

const AddTicketModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchTicket } = props;

  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddTicket,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessMutateAddTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessMutateAddTicket]);

  const disabledSubmit = isPendingMutateAddTicket;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <form onSubmit={handleSubmitForm(handleAddTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>
            <h3>Add Ticket</h3>
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
                      className="rounded"
                      variant="bordered"
                      label="Name"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="price"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Price"
                      isInvalid={errors.price !== undefined}
                      errorMessage={errors.price?.message}
                    />
                  )}
                />

                <Controller
                  name="quantity"
                  control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Quantity"
                      isInvalid={errors.quantity !== undefined}
                      errorMessage={errors.quantity?.message}
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
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex flex-row justify-end gap-3">
              <Button
                className="font-medium text-danger-500"
                variant="flat"
                onPress={() => {
                  reset();
                  onClose();
                }}
                disabled={disabledSubmit}
              >
                Cancel
              </Button>
              <Button
                className="font-medium text-white"
                color="danger"
                type="submit"
                disabled={isPendingMutateAddTicket}
              >
                {isPendingMutateAddTicket ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Create Ticket"
                )}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
