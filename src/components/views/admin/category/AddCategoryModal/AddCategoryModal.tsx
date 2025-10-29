import InputFile from "@/components/ui/InputFile";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@heroui/react";

interface PropTypes {
  isOpen: boolean;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen } = props;
  return (
    <Modal isOpen={isOpen} placement="center" scrollBehavior="inside">
      <form>
        <ModalContent className="m-4">
          <ModalHeader>
            <h3 className="">Add Category</h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">Infromation</p>
                <Input className="rounded" variant="bordered" label="Name" type="text"/>
                <Textarea label="Description" variant="bordered"/>
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-bold text-sm">Icon</p>
                <InputFile name="input" isDropable/> 
              </div>

              <div className="flex flex-row gap-3 justify-end">
                <Button className="text-danger-500 font-medium">Cancel</Button>
                <Button className="text-white font-medium" color="danger">Create Category</Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
