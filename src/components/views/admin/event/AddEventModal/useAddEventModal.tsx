import { ToasterContext } from "@/context/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
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
  banner: yup.mixed<FileList | string>().required("Please upload an banner"),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
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



  // for adding new category
  const addCategory = async (payload: ICategory) => {
    const response = await categoryServices.addCategory(payload);
    return response;
  };

  //setup mutation for adding category
  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: (error as Error).message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Successsfully added category",
      });
      reset(); // use reset for reset form after success
    },
  });



  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,

    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handelOnCLose
  }
};

export default useAddEventModal;

