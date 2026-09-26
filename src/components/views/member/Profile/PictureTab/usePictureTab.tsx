import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePicture = yup.object().shape({
  profilePicture: yup
    .mixed<FileList | string>() // mixed is used for handling multiple types so we can handle both FileList and string types
    .required("Please input picture"),
});

const usePictureTab = () => {
   const {
      isPendingMutateUploadFile,
      isPendingMutateDeleteFile,

      handleUploadFile,
      handleDeleteFile,
  } = useMediaHandling();


  // create control form for schemaUpdatePicture
  const {
    control: controlUpdatePicture, // use for controlling handling value form
    handleSubmit: handleSubmitUpdatePicture, // use for handling submit form (validate first then call function)
    formState: { errors: errorsUpdatePicture }, // use for getting error message from validation
    reset: resetUpdatePicture, // use for reset form
    watch: watchUpdatePicture, // use for watching value form (like onChange)
    getValues: getValueUpdatePicture, // use for getting form values
    setValue: setValueUpdatePicture, // use for setting form values
  } = useForm({
    resolver: yupResolver(schemaUpdatePicture), // resolver validation by yup schema
  });

  // for watching preview Picture
  const preview = watchUpdatePicture("profilePicture");
  const fileUrl = getValueUpdatePicture("profilePicture");

  //create handle upload picture
  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
   handleUploadFile(files, onChange, (fileUrl: string) => {
      setValueUpdatePicture("profilePicture", fileUrl); // set value field in db "profilePicture" with fileUrl after upload success
    });
  };

  // create handle delete icon
  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(fileUrl, () => {
        onChange(undefined); // set value to form as undefined or empty
      }); 
    }
  };


  return {
    handleUploadPicture,
    handleDeletePicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    resetUpdatePicture,
    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    preview,
  };
};

export default usePictureTab;
