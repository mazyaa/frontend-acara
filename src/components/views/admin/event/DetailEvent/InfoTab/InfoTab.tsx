import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
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
import { IEvent, IEventForm } from "@/types/Event";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEvent;
  onUpdate: (data: IEvent) => void;
  name: string;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, name, isPendingUpdate, isSuccessUpdate } = props;

  // only for controlling form in InfoTab
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    handleSubmitUpdateInfo,

    dataCategory,
  } = useInfotab();

  const disabledButton = isPendingUpdate;

  useEffect(() => {
    setValueUpdateInfo("name", dataEvent?.name || "");
    setValueUpdateInfo("slug", dataEvent?.slug || "");
    setValueUpdateInfo("category", dataEvent?.category || "");
    setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
    setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
    setValueUpdateInfo(
      "isPublish",
      dataEvent?.isPublish ? String(dataEvent?.isPublish) : "",
    );
    setValueUpdateInfo(
      "isFeatured",
      dataEvent?.isFeatured ? String(dataEvent?.isFeatured) : "",
    );
    setValueUpdateInfo("description", dataEvent?.description || "");
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Event Information</h1>
        <p className="text-sm text-default-400">
          Manage information of this event
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

            <Skeleton isLoaded={!!dataEvent.name} className="rounded-sm">
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

            <Skeleton isLoaded={!!dataEvent.slug} className="rounded-sm">
              <Controller
                name="slug"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    className="rounded"
                    variant="bordered"
                    label="Slug"
                    isInvalid={errorsUpdateInfo.slug !== undefined}
                    errorMessage={errorsUpdateInfo.slug?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataEvent.category} className="rounded-sm">
              <Controller
                name="category"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    className="rounded"
                    defaultItems={dataCategory?.data.data || []}
                    defaultSelectedKey={dataEvent?.category || ""}
                    variant="bordered"
                    label="Category"
                    isInvalid={errorsUpdateInfo.category !== undefined}
                    errorMessage={errorsUpdateInfo.category?.message}
                    onSelectionChange={(value) => onChange(value)} // onChange is coming from react hook form for setting value to form
                    placeholder="Select Category"
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={category._id}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataEvent.startDate} className="rounded-sm">
              <Controller
                name="startDate"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field: { onChange, ...field } }) => (
                  <DatePicker
                    {...field}
                    className="rounded"
                    variant="bordered"
                    label="Start Date"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                    errorMessage={errorsUpdateInfo.startDate?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataEvent.endDate} className="rounded-sm">
              <Controller
                name="endDate"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field: { onChange, ...field } }) => (
                  <DatePicker
                    {...field}
                    className="rounded"
                    variant="bordered"
                    label="End Date"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                    errorMessage={errorsUpdateInfo.endDate?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton isLoaded={!!dataEvent.isPublish} className="rounded-sm">
              <Controller
                name="isPublish"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field: { onChange, ...field } }) => (
                  <Select
                      {...field}
                      className="rounded"
                      defaultSelectedKeys={[dataEvent.isPublish ? "true" : "false"]}
                      variant="bordered"
                      label="Status"
                      isInvalid={errorsUpdateInfo.isPublish !== undefined}
                      errorMessage={errorsUpdateInfo.isPublish?.message}
                    >
                      <SelectItem key="true">Publish</SelectItem>
                      <SelectItem key="false">Draft</SelectItem>
                    </Select>
                )}
              />
            </Skeleton>
            
            <Skeleton isLoaded={!!dataEvent.isFeatured} className="rounded-sm">
              <Controller
                name="isFeatured"
                control={controlUpdateInfo} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field: { onChange, ...field } }) => (
                  <Select
                      {...field}
                      className="rounded"
                      defaultSelectedKeys={[dataEvent.isFeatured ? "true" : "false"]}
                      variant="bordered"
                      label="Featured"
                      isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                      errorMessage={errorsUpdateInfo.isFeatured?.message}
                    >
                      <SelectItem key="true">Yes</SelectItem>
                      <SelectItem key="false">No</SelectItem>
                    </Select>
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataEvent?.description}
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
                disabled={isPendingUpdate || !dataEvent?._id}
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
                disabled={isPendingUpdate || !dataEvent?._id}
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
