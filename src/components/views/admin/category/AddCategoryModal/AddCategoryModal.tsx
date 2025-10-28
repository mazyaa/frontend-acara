import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";

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
                        Add Category
                    </ModalHeader>
                    <ModalBody>
                        Test Modal
                    </ModalBody>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default AddCategoryModal;