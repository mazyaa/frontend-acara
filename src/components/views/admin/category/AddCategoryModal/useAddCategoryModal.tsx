import { ToasterContext } from "@/context/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  icon: yup.mixed<FileList | string>().required("Please upload an icon"),
});

const useAddCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
      mutateUploadFile,
      isPendingMutateUploadFile,
      mutateDeleteFile,
      isPendingMutateDeleteFile,
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
  
  const preview = watch("icon");

  //create handle upload icon
  const handleUploadIcon = (files: FileList, onChange: (files: FileList | undefined) => void) => {
    if (files.length !== 0) {
      onChange(files); // set value to form as a FileList
      mutateUploadFile({
        file: files[0], // upload first file only
        callback: (fileUrl: string) => { // after upload success set vaalue form type as a string (url)
          setValue("icon", fileUrl); // set uploaded file url to form value
        }
      })
    }
  }

  // create handle delete icon
  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void
   ) => {
    const fileUrl = getValues("icon");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => onChange(undefined)
      });
    }
  }

  //create onClose modal
  //for deleting uploaded icon when modal closed
  const handelOnCLose = (
    onCLose: () => void
  ) => {
    const fileUrl = getValues("icon");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => {
          reset(); // reset form after delete success
          onCLose(); // close modal
        }
      })
    } else {
      reset(); // reset form after delete success
      onCLose(); // close modal
    }
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
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handelOnCLose
  }
};

export default useAddCategoryModal;

