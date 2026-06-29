import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/context/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.services";
import { ICategory } from "@/types/Category";
import { IEvent } from "@/types/Event";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please input category"),
  startDate: yup.mixed<DateValue>().required("Please input start date"),
  endDate: yup.mixed<DateValue>().required("Please input end date"),
  isPublish: yup.string().required("Please select publish status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Pleas input latitude"),
  longitude: yup.string().required("Pleas input longitude"),
  banner: yup.mixed<FileList | string>().required("Please upload an banner"),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const debounce = useDebounce();
  const router = useRouter();
  const {
      isPendingMutateUploadFile,
      isPendingMutateDeleteFile,

      handleUploadFile,
      handleDeleteFile,
  } = useMediaHandling();

  
  // create control form
  const {
    control, // use for controlling handling value form
    handleSubmit: handleSubmitForm, // use for handling submit form (validate first then call function)
    formState: { errors }, // use for getting error message from validation
    reset, // use for reset form
    watch, // use for watching value form (like onChange)
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema), // resolver validation by yup schema
  });
  
  const preview = watch("banner");
  const fileUrl = getValues("banner");

  //create handle upload banner
  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
   handleUploadFile(files, onChange, (fileUrl: string) => {
      setValue("banner", fileUrl); // set value field in db "banner" with fileUrl after upload success
    });
  };

  // create handle delete icon
  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(fileUrl, () => {
        onChange(undefined); // set value to form as undefined or empty
      }); 
    }
  };

  //create onClose modal
  //for deleting uploaded icon when modal closed
  const handelOnCLose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset(); // reset form after delete success
      onClose(); // close modal after delete success
    });
  }


  //get categories for select input

    const { 
        data: dataCategory,
    } = useQuery({
        queryKey: ['Categories'], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
        queryFn: () => categoryServices.getCategories("?limit=1000"),
        enabled: true, // is a dependency the useQuery is run by that value or condition is true
    });

    //get region for select input
    const [searchRegency, setSearchRegency] = useState<string>("");

    const handleSearchRegency = (region: string) => {
      debounce(() => setSearchRegency(region), DELAY) 
    }

    const {
      data: dataRegion,
    } = useQuery({
      queryKey: ['Region', searchRegency], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
      queryFn: () => eventServices.searchLocationByRegency(searchRegency),
      enabled: searchRegency !== "", // is a dependency the useQuery is run by that value is not empty string, so if the searchRegency is empty string it will not run the query
    })

  // for adding new event
  const addEvent = async (payload: IEvent) => {
    const response = await eventServices.addEvent(payload);
    return response;
  };

  //setup mutation for adding event
  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: (error as Error).message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Successsfully added event",
      });
      reset(); // use reset for reset form after success
    },
  });



  const handleAddEvent = (data: IEvent) => mutateAddEvent(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handelOnCLose,

    dataCategory,
    dataRegion,
    searchRegency,
    handleSearchRegency,
  }
};

export default useAddEventModal;

