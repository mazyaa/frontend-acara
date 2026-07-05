import categoryServices from "@/services/category.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateEvent = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please input category"),
  startDate: yup.mixed<DateValue>().optional(),
  endDate: yup.mixed<DateValue>().optional(),
  isPublish: yup.string().required("Please select publish status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Pleas input latitude"),
  longitude: yup.string().required("Pleas input longitude"),
  banner: yup.mixed<FileList | string>().required("Please upload an banner"),
});

const useInfotab = () => {
  // create control form for SchemaUpdateEvent
  const {
    control: controlUpdateInfo, // use for controlling handling value form
    handleSubmit: handleSubmitUpdateInfo, // use for handling submit form (validate first then call function)
    formState: { errors: errorsUpdateInfo }, // use for getting error message from validation
    reset: resetUpdateInfo, // use for reset form
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateEvent), // resolver validation by yup schema
  }); 

    //get categories for select input

    const { 
        data: dataCategory,
    } = useQuery({
        queryKey: ['Categories'], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
        queryFn: () => categoryServices.getCategories("?limit=1000"),
        enabled: true, // is a dependency the useQuery is run by that value or condition is true
    });

  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    handleSubmitUpdateInfo,

    dataCategory,
  };
};

export default useInfotab;
