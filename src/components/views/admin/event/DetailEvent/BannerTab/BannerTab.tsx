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
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useBannerTab from "./useBannerTab";

interface PropTypes {
  currentBanner: string;
  onUpdate: (data: { banner: string | FileList  }) => void;
  name: string;
  isPendingUpdate: boolean;
  isSuccessUpdateBanner: boolean
}


const BannerTab = (props: PropTypes) => {
  const { currentBanner, name, onUpdate, isPendingUpdate, isSuccessUpdateBanner } = props;
  const {
    handleDeleteBanner,
    handleUploadBanner,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    
    resetUpdateBanner,
    controlUpdateBanner,
    errorsUpdateBanner,
    handleSubmitUpdateBanner,
    preview,
  } = useBannerTab();
  
  useEffect(() => {
    if (isSuccessUpdateBanner) {
      resetUpdateBanner();
    }
  }, [isSuccessUpdateBanner]);

  const disabledButton = isPendingMutateUploadFile || isPendingUpdate || !preview;

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Banner Event</h1>
        <p className="text-sm text-default-400">Manage banner of this event</p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateBanner(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Banner</p>
            <Skeleton
              isLoaded={!!currentBanner}
              className="aspect-video rounded-lg"
            >
              <Image className="!relative" src={currentBanner} fill alt={name} />
            </Skeleton>

            <Controller
              name="banner"
              control={controlUpdateBanner} // use control for connect input with react hook form, meaning input value will be managed by react hook form
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field} // inject some propperties like onChange, value, name, ref from react hook form to Input component because by default some properties like onChange and value are not connected to react hook form
                  onDelete={() => handleDeleteBanner(onChange)} // onChange is coming from react hook form for setting value to form
                  onUpload={(files) => handleUploadBanner(files, onChange)} // params files is coming from handleOnUpload in InputFile component, onChange is coming from react hook form for setting value to form
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateBanner.banner !== undefined} // show input error state if have error
                  errorMessage={errorsUpdateBanner.banner?.message}
                  preview={typeof preview === "string" ? preview : ""}
                  label={
                    <p className="my-2 text-sm font-bold">Upload new banner</p>
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

export default BannerTab;
