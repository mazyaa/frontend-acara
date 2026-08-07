import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateImage = yup.object().shape({
  image: yup
    .mixed<FileList | string>() // mixed is used for handling multiple types so we can handle both FileList and string types
    .required("Please input image"),
});

const useImageTab = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();


  // create control form for schemaUpdateImage
  const {
    control: controlUpdateImage, // use for controlling handling value form
    handleSubmit: handleSubmitUpdateImage, // use for handling submit form (validate first then call function)
    formState: { errors: errorsUpdateImage }, // use for getting error message from validation
    reset: resetUpdateImage, // use for reset form
    watch: watchUpdateImage, // use for watching value form (like onChange)
    getValues: getValuesUpdateImage, // use for getting form values
    setValue: setValueUpdateImage, // use for setting form values
  } = useForm({
    resolver: yupResolver(schemaUpdateImage), // resolver validation by yup schema
  });

  // for watching preview image
  const preview = watchUpdateImage("image");

  // for handling upload image
  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files); // set value to form as a FileList
      mutateUploadFile({
        file: files[0], // upload first file only
        callback: (fileUrl: string) => {
          // after upload success set vaalue form type as a string (url)
          setValueUpdateImage("image", fileUrl); // set uploaded file url to form value
        },
      });
    }
  };

  // create handle delete image
  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateImage("image");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => onChange(undefined),
      });
    }
  };


  return {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    resetUpdateImage,
    controlUpdateImage,
    errorsUpdateImage,
    handleSubmitUpdateImage,
    preview,
  };
};

export default useImageTab;
