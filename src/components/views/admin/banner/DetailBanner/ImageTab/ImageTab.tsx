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
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: { image: FileList | string }) => void;
  name: string;
  isPendingUpdate: boolean;
  isSuccessUpdateImage: boolean
}


const ImageTab = (props: PropTypes) => {
  const { currentImage, name, onUpdate, isPendingUpdate, isSuccessUpdateImage } = props;
  const {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    
    resetUpdateImage,
    controlUpdateImage,
    errorsUpdateImage,
    handleSubmitUpdateImage,
    preview,
  } = useImageTab();
  
  useEffect(() => {
    if (isSuccessUpdateImage) {
      resetUpdateImage();
    }
  }, [isSuccessUpdateImage]);

  const disabledButton = isPendingMutateUploadFile || isPendingUpdate || !preview;

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Category Image</h1>
        <p className="text-sm text-default-400">Manage image of this category</p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Image</p>
            <Skeleton
              isLoaded={!!currentImage}
              className="h-32 rounded-lg"
            >
              <Image className="!relative rounded-lg" src={currentImage} fill alt={name} />
            </Skeleton>

            <Controller
              name="image"
              control={controlUpdateImage} // use control for connect input with react hook form, meaning input value will be managed by react hook form
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field} // inject some propperties like onChange, value, name, ref from react hook form to Input component because by default some properties like onChange and value are not connected to react hook form
                  onDelete={() => handleDeleteImage(onChange)} // onChange is coming from react hook form for setting value to form
                  onUpload={(files) => handleUploadImage(files, onChange)} // params files is coming from handleOnUpload in InputFile component, onChange is coming from react hook form for setting value to form
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateImage.image !== undefined} // show input error state if have error
                  errorMessage={errorsUpdateImage.image?.message}
                  preview={typeof preview === "string" ? preview : ""}
                  label={
                    <p className="my-2 text-sm font-bold">Upload new image</p>
                  }
                  isDropable
                />
              )}
            />
          </div>

          {disabledButton ? (
            <Button
              className="font-medium text-white"
              color="default"
              type="submit"
              disabled={
                isPendingMutateUploadFile || isPendingUpdate || !preview
              }
            >
              {isPendingUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          ) : (
            <Button
              className="font-medium text-white"
              color="danger"
              type="submit"
              disabled={
                isPendingMutateUploadFile || isPendingUpdate || !preview
              }
            >
              {isPendingUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          )}
        </form>
      </CardBody>
    </Card>
  );
};

export default ImageTab;
