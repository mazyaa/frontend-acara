import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateBanner = yup.object().shape({
  banner: yup
    .mixed<FileList | string>() // mixed is used for handling multiple types so we can handle both FileList and string types
    .required("Please input banner"),
});

const useBannerTab = () => {
   const {
      isPendingMutateUploadFile,
      isPendingMutateDeleteFile,

      handleUploadFile,
      handleDeleteFile,
  } = useMediaHandling();


  // create control form for schemaUpdateBanner
  const {
    control: controlUpdateBanner, // use for controlling handling value form
    handleSubmit: handleSubmitUpdateBanner, // use for handling submit form (validate first then call function)
    formState: { errors: errorsUpdateBanner }, // use for getting error message from validation
    reset: resetUpdateBanner, // use for reset form
    watch: watchUpdateBanner, // use for watching value form (like onChange)
    getValues: getValueUpdateBanner, // use for getting form values
    setValue: setValueUpdateBanner, // use for setting form values
  } = useForm({
    resolver: yupResolver(schemaUpdateBanner), // resolver validation by yup schema
  });

  // for watching preview banner
  const preview = watchUpdateBanner("banner");
  const fileUrl = getValueUpdateBanner("banner");

  //create handle upload banner
  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
   handleUploadFile(files, onChange, (fileUrl: string) => {
      setValueUpdateBanner("banner", fileUrl); // set value field in db "banner" with fileUrl after upload success
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


  return {
    handleUploadBanner,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    resetUpdateBanner,
    controlUpdateBanner,
    errorsUpdateBanner,
    handleSubmitUpdateBanner,
    preview,
  };
};

export default useBannerTab;
