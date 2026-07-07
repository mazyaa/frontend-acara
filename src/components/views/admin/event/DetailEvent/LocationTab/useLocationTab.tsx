import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateEvent = yup.object().shape({
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Pleas input latitude"),
  longitude: yup.string().required("Pleas input longitude"),
});

const useLocationTab = () => {
  // create control form for SchemaUpdateEvent
  const {
    control: controlUpdateLocation, // use for controlling handling value form
    handleSubmit: handleSubmitUpdateLocation, // use for handling submit form (validate first then call function)
    formState: { errors: errorsUpdateLocation }, // use for getting error message from validation
    reset: resetUpdateLocation, // use for reset form
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateEvent), // resolver validation by yup schema
  });

  const debounce = useDebounce();

  const [searchRegency, setSearchRegency] = useState<string>("");

  const handleSearchRegency = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchRegency], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
    queryFn: () => eventServices.searchLocationByRegency(searchRegency),
    enabled: searchRegency !== "", // is a dependency the useQuery is run by that value is not empty string, so if the searchRegency is empty string it will not run the query
  });

  return {
    controlUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
    handleSubmitUpdateLocation,

    handleSearchRegency,
    searchRegency,
    dataRegion,
  };
};

export default useLocationTab;
