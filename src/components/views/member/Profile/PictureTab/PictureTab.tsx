import InputFile from "@/components/ui/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";
import usePictureTab from "./usePictureTab";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdatePicture: boolean
}


const PictureTab = (props: PropTypes) => {
  const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdatePicture } = props;
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    
    resetUpdatePicture,
    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    preview,
  } = usePictureTab();
  
  useEffect(() => {
    if (isSuccessUpdatePicture) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdatePicture]);

  const disabledButton = isPendingMutateUploadFile || isPendingUpdate || !preview;

  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Picture Profile</h1>
        <p className="text-sm text-default-400">Manage your profile picture</p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Picture</p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="aspect-square w-full rounded-lg"
            >
              <Avatar className="aspect-square w-full h-full" src={currentPicture} alt="Picture" showFallback />
            </Skeleton>

            <Controller
              name="profilePicture"
              control={controlUpdatePicture} // use control for connect input with react hook form, meaning input value will be managed by react hook form
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field} // inject some propperties like onChange, value, name, ref from react hook form to Input component because by default some properties like onChange and value are not connected to react hook form
                  onDelete={() => handleDeletePicture(onChange)} // onChange is coming from react hook form for setting value to form
                  onUpload={(files) => handleUploadPicture(files, onChange)} // params files is coming from handleOnUpload in InputFile component, onChange is coming from react hook form for setting value to form
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdatePicture.profilePicture !== undefined} // show input error state if have error
                  errorMessage={errorsUpdatePicture.profilePicture?.message}
                  preview={typeof preview === "string" ? preview : ""}
                  label={
                    <p className="my-2 text-sm font-bold">Upload new picture</p>
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

export default PictureTab;
