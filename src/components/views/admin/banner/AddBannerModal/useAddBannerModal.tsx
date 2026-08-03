import { ToasterContext } from "@/context/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.services";
import { IBanner } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  isShow: yup.string().required("Please input hide or show"),
  image: yup.mixed<FileList | string>().required("Please upload an image"),
});

const useAddBannerModal = () => {
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

  const preview = watch("image");
  const fileUrl = getValues("image");

  //create handle upload image
  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
   handleUploadFile(files, onChange, (fileUrl: string) => {
      setValue("image", fileUrl); // set value field in db "iamge" with fileUrl after upload success
    });
  };

  // create handle delete image
  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(fileUrl, () => {
        onChange(undefined); // set value to form as undefined
      }); // after delete success set value form as undefined
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

  // for adding new Banner
  const addBanner = async (payload: IBanner) => {
    const response = await bannerServices.addBanner(payload);
    return response;
  };

  //setup mutation for adding Banner
  const {
    mutate: mutateAddBanner,
    isPending: isPendingMutateAddBanner,
    isSuccess: isSuccessMutateAddBanner,
  } = useMutation({
    mutationFn: addBanner,
    onError: (error) => {
      setToaster({
        type: "error",
        message: (error as Error).message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Successsfully added banner",
      });
      reset(); // use reset for reset form after success
    },
  });

  const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handelOnCLose,
  };
};

export default useAddBannerModal;
