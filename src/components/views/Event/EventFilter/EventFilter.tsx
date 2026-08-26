import { ICategory } from "@/types/Category";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Fragment, useEffect } from "react";

const EventFilter = () => {
  const { control, setValue, dataCategory, isSuccessGetCategory } =
    useEventFilter();
  const {
    handleChangeCategory,
    handleChangeIsFeatured,
    handleChangeIsOnline,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentIsOnline}`);
      setValue("isFeatured", `${currentIsFeatured}`);
    }
  }, [isSuccessGetCategory]);
  return (
    <div className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-20 lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessGetCategory ? (
          <Fragment>
            <Controller
              name="category"
              control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  className="rounded"
                  defaultItems={dataCategory?.data.data || []}
                  variant="bordered"
                  label="Category"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }} // onChange is coming from react hook form for setting value to form
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

            <Controller
              name="isOnline"
              control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
              render={({ field: { onChange, ...field } }) => (
                // use onChange because select option is not a normal input, so we need to use onChange to set the value to react hook form
                <Select
                  {...field}
                  labelPlacement="outside"
                  label="Select Online / Offline"
                  className="rounded"
                  defaultSelectedKeys={[`${currentIsOnline}`]}
                  variant="bordered"
                  onChange={(e) => {
                    handleChangeIsOnline(e.target.value);
                  }} // onChange is coming from react hook form for setting value to form
                >
                  <SelectItem key="true">Online</SelectItem>
                  <SelectItem key="false">Offline</SelectItem>
                </Select>
              )}
            />

            <Controller
              name="isFeatured"
              control={control} // use control for connect input with react hook form, meaning input value will be managed by react hook form
              render={({ field: { onChange, ...field } }) => (
                // use onChange because select option is not a normal input, so we need to use onChange to set the value to react hook form
                <Select
                  {...field}
                  labelPlacement="outside"
                  label="Select Yes / No Featured"
                  className="rounded"
                  defaultSelectedKeys={[`${currentIsFeatured}`]}
                  variant="bordered"
                  onChange={(e) => {
                    handleChangeIsFeatured(e.target.value);
                  }} // onChange is coming from react hook form for setting value to form
                >
                  <SelectItem key="true">Yes</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              )}
            />
          </Fragment>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
