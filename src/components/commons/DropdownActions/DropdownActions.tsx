import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
 keyDetailButton: string;
 keyDeleteButton: string;
 onPressDetailButton: () => void;
 onPressDeleteButton: () => void;
}

const DropdownActions = (props: PropTypes) => {
    const { keyDetailButton, keyDeleteButton, onPressDetailButton, onPressDeleteButton } = props;
    return (
         <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem
                  key={keyDetailButton}
                  onPress={onPressDetailButton}
                >
                  Detail Catgeory
                </DropdownItem>
                <DropdownItem
                  key={keyDeleteButton}
                  className="text-danger-600"
                  onPress={onPressDeleteButton}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
    )
}

export default DropdownActions;