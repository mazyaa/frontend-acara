import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataProfile, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  // only for controlling form in InfoTab
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    handleSubmitUpdateInfo,
  } = useInfoTab();

  const disabledButton = isPendingUpdate;

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullName", dataProfile?.fullName || "");
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">User Information</h1>
        <p className="text-sm text-default-400">
          Manage information of this account
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-default-700">
              Current Information
            </p>

            <Skeleton isLoaded={!!dataProfile?.userName} className="rounded-sm">
              <Input
                labelPlacement="outside"
                variant="flat"
                disabled
                label="Username"
                value={dataProfile?.userName}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataProfile?.userName} className="rounded-sm">
              <Input
                labelPlacement="outside"
                variant="flat"
                disabled
                label="Username"
                value={dataProfile?.userName}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataProfile?.email} className="rounded-sm">
              <Input
                labelPlacement="outside"
                variant="flat"
                disabled
                label="Email"
                value={dataProfile?.email}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataProfile?.role} className="rounded-sm">
              <Input
                labelPlacement="outside"
                variant="flat"
                disabled
                label="Role"
                value={dataProfile?.role}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataProfile?.fullName} className="rounded-sm">
              <Controller
                name="fullName"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    labelPlacement="outside"
                    variant="bordered"
                    label="Fullname"
                    placeholder="Insert your fullname"
                    isInvalid={errorsUpdateInfo.fullName !== undefined}
                    errorMessage={errorsUpdateInfo.fullName?.message}
                  />
                )}
              />
            </Skeleton>

            {disabledButton ? (
              <Button
                className="font-medium text-white"
                color="default"
                type="submit"
                disabled={isPendingUpdate || !dataProfile?._id}
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
                disabled={isPendingUpdate || !dataProfile?._id}
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
