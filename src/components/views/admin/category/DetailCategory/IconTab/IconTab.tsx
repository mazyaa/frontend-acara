import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";

interface PropTypes {
  currentIcon: string;
  name: string;
  isPendingUpdate: boolean;
  onUpdate: (data: {icon: FileList | string}) => void;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon, name, onUpdate, isPendingUpdate } = props;
  const {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateIcon,
    errorsUpdateIcon,
    handleSubmitUpdateIcon,
    preview,
  } = useIconTab();

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Category Icon</h1>
        <p className="text-sm text-default-400">Manage icon of this category</p>
      </CardHeader>

      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateIcon(onUpdate)}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image className="!relative" src={currentIcon} fill alt={name} />
            </Skeleton>

            <Controller
              name="icon"
              control={controlUpdateIcon} // use control for connect input with react hook form, meaning input value will be managed by react hook form
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field} // inject some propperties like onChange, value, name, ref from react hook form to Input component because by default some properties like onChange and value are not connected to react hook form
                  onDelete={() => handleDeleteIcon(onChange)} // onChange is coming from react hook form for setting value to form
                  onUpload={(files) => handleUploadIcon(files, onChange)} // params files is coming from handleOnUpload in InputFile component, onChange is coming from react hook form for setting value to form
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateIcon.icon !== undefined} // show input error state if have error
                  errorMessage={errorsUpdateIcon.icon?.message}
                  preview={typeof preview === "string" ? preview : ""}
                  label={<p className="my-2 text-sm font-bold">Upload new icon</p>}
                  isDropable
                />
              )}
            />
          </div>

          <Button
            className="font-medium text-white"
            color="danger"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
