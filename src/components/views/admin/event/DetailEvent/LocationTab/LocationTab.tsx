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
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEvent, IEventForm, IRegency } from "@/types/Event";
import useLocationTab from "./useLocationTab";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const LocationTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, dataDefaultRegion, isPendingDefaultRegion, isPendingUpdate, isSuccessUpdate } = props;

  // only for controlling form in LocationTab
  const {
    controlUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
    handleSubmitUpdateLocation,

    handleSearchRegency,
    searchRegency,
    dataRegion,
  } = useLocationTab();

  const disabledButton = isPendingUpdate;

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation(
        "isOnline",
        dataEvent?.isOnline ? String(dataEvent?.isOnline) : "",
      );
      setValueUpdateLocation("region", dataEvent?.location?.region || "");
      setValueUpdateLocation(
        "latitude",
        dataEvent?.location?.coordinates[1]
          ? String(dataEvent?.location?.coordinates[1])
          : "",
      ); // get latitude from coordinates array, which is the second element (index 1)
      setValueUpdateLocation(
        "longitude",
        dataEvent?.location?.coordinates[0]
          ? String(dataEvent?.location?.coordinates[0])
          : "",
      ); // get longitude from coordinates array, which is the first element (index 0)
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Event Location</h1>
        <p className="text-sm text-default-400">
          Manage location of this event
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Location
            </p>

            <Skeleton isLoaded={!!dataEvent?.isOnline} className="rounded-sm">
              <Controller
                name="isOnline"
                control={controlUpdateLocation} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field: { onChange, ...field } }) => (
                  <Select
                    {...field}
                    className="rounded"
                    defaultSelectedKeys={[
                      dataEvent.isOnline ? "true" : "false",
                    ]}
                    variant="bordered"
                    label="Online / Offline"
                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
                    errorMessage={errorsUpdateLocation.isOnline?.message}
                  >
                    <SelectItem key="true">Online</SelectItem>
                    <SelectItem key="false">Offline</SelectItem>
                  </Select>
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
              className="rounded-sm"
            >
              {!isPendingDefaultRegion ? (
                <Controller
                name="region"
                control={controlUpdateLocation} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field: { onChange, ...field } }) => (
                  // onChange is coming from react hook form for setting value to form
                  <Autocomplete
                    {...field} // spread field from react hook form to connect input with react hook form, meaning input value will be managed by react hook form
                    className="rounded"
                    defaultItems={
                      dataRegion?.data.data && searchRegency !== ""
                        ? dataRegion.data.data
                        : []
                    } // defaultItems is coming from api response, which is the list of region data
                    defaultInputValue={dataDefaultRegion} // defaultInputValue is coming from api response, which is the name of region
                    variant="bordered"
                    label="City"
                    onInputChange={(search) => handleSearchRegency(search)} // for searching region by name, it will call api to get region data
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    errorMessage={errorsUpdateLocation.region?.message}
                    onSelectionChange={(value) => onChange(value)} // onChange is coming from react hook form for setting value to form
                    placeholder="Search City Here..."
                  >
                    {(regency: IRegency) => (
                      <AutocompleteItem key={regency.id}>
                        {regency.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              ): (
                <div className="w-full h-10"></div>
              )}
            </Skeleton>

            <Skeleton
              isLoaded={!!dataEvent.location?.coordinates[0]}
              className="rounded-sm"
            >
              <Controller
                name="latitude"
                control={controlUpdateLocation} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    className="rounded"
                    variant="bordered"
                    label="Latitude"
                    isInvalid={errorsUpdateLocation.latitude !== undefined}
                    errorMessage={errorsUpdateLocation.latitude?.message}
                  />
                )}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataEvent.location?.coordinates[1]}
              className="rounded-sm"
            >
              <Controller
                name="longitude"
                control={controlUpdateLocation} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    className="rounded"
                    variant="bordered"
                    label="Longitude"
                    isInvalid={errorsUpdateLocation.longitude !== undefined}
                    errorMessage={errorsUpdateLocation.longitude?.message}
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

export default LocationTab;
