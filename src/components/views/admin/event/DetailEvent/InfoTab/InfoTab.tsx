import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import Image from "next/image";
import useInfotab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  name: string;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory, onUpdate, name, isPendingUpdate, isSuccessUpdate } =
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
    setValueUpdateInfo("name", dataCategory?.name || "");
    setValueUpdateInfo("description", dataCategory?.description || "");
  }, [dataCategory]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Category Information</h1>
        <p className="text-sm text-default-400">
          Manage information of this category
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
              isLoaded={!!dataCategory.description}
              className="rounded-sm"
            >
              <Controller
                name="name"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    className="rounded"
                    variant="bordered"
                    label="Name"
                    isInvalid={errorsUpdateInfo.name !== undefined}
                    errorMessage={errorsUpdateInfo.name?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataCategory?.description}
              className="rounded-sm"
            >
              <Controller // use Controller for connect custom input component with react hook form and inject some propertie like onChange, value, name, ref to input component
                name="description" // shout use name propeerty because it will be used as key in form data
                control={controlUpdateInfo} // an property from Controller for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Textarea
                    {...field} // for inject some propperties like onChange, value, name, ref from react hook form to Input component, so Input component can be controlled by react hook form because by default some properties like onChange and value are not connected to react hook form
                    className="rounded"
                    variant="bordered"
                    label="Description"
                    isInvalid={errorsUpdateInfo.description !== undefined}
                    errorMessage={errorsUpdateInfo.description?.message}
                  />
                )}
              />
            </Skeleton>

            {disabledButton ? (
              <Button
                className="font-medium text-white"
                color="default"
                type="submit"
                disabled={isPendingUpdate || !dataCategory?._id}
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
                disabled={isPendingUpdate || !dataCategory?._id}
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
