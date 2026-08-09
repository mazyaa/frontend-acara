import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfotab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";

interface PropTypes {
  dataBanner: IBanner;
  onUpdate: (data: IBanner) => void;
  name: string;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataBanner, onUpdate, name, isPendingUpdate, isSuccessUpdate } =
    props;

  // only for controlling form in InfoTab
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    handleSubmitUpdateInfo,
  } = useInfotab();

  const disabledButton = isPendingUpdate;

  useEffect(() => {
    setValueUpdateInfo("title", `${dataBanner?.title}`);
    setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);
  }, [dataBanner]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Banner Information</h1>
        <p className="text-sm text-default-400">
          Manage information of this banner
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Information
            </p>
            <Skeleton
              isLoaded={!!dataBanner.title}
              className="rounded-sm"
            >
              <Controller
                name="title"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    className="rounded"
                    variant="bordered"
                    label="Title"
                    isInvalid={errorsUpdateInfo.title !== undefined}
                    errorMessage={errorsUpdateInfo.title?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataBanner}
              className="rounded-sm"
            >
               
               <Controller
                  name="isShow"
                  control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="rounded"
                      variant="bordered"
                      label="Status"
                      defaultSelectedKeys={[dataBanner?.isShow ? "true" : "false"]} // set default value for select
                      isInvalid={errorsUpdateInfo.isShow !== undefined}
                      errorMessage={errorsUpdateInfo.isShow?.message}
                    >
                      <SelectItem key="true">Show</SelectItem>
                      <SelectItem key="false">Hide</SelectItem>
                    </Select>
                  )}
                />
            </Skeleton>

            {disabledButton ? (
              <Button
                className="font-medium text-white"
                color="default"
                type="submit"
                disabled={isPendingUpdate || !dataBanner?._id}
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
                disabled={isPendingUpdate || !dataBanner?._id}
              >
                {isPendingUpdate ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
