import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateIcon = yup.object().shape({
  icon: yup
    .mixed<FileList | string>() // mixed is used for handling multiple types so we can handle both FileList and string types
    .required("Please input icon"),
});

const useIconTab = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();


  // create control form for schemaUpdateIcon
  const {
    control: controlUpdateIcon, // use for controlling handling value form
    handleSubmit: handleSubmitUpdateIcon, // use for handling submit form (validate first then call function)
    formState: { errors: errorsUpdateIcon }, // use for getting error message from validation
    reset: resetUpdateIcon, // use for reset form
    watch: watchUpdateIcon, // use for watching value form (like onChange)
    getValues: getValuesUpdateIcon, // use for getting form values
    setValue: setValueUpdateIcon, // use for setting form values
  } = useForm({
    resolver: yupResolver(schemaUpdateIcon), // resolver validation by yup schema
  });

  // for watching preview icon
  const preview = watchUpdateIcon("icon");

  // for handling upload icon
  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files); // set value to form as a FileList
      mutateUploadFile({
        file: files[0], // upload first file only
        callback: (fileUrl: string) => {
          // after upload success set vaalue form type as a string (url)
          setValueUpdateIcon("icon", fileUrl); // set uploaded file url to form value
        },
      });
    }
  };

  // create handle delete icon
  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateIcon("icon");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => onChange(undefined),
      });
    }
  };


  return {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    resetUpdateIcon,
    controlUpdateIcon,
    errorsUpdateIcon,
    handleSubmitUpdateIcon,
    preview,
  };
};

export default useIconTab;
