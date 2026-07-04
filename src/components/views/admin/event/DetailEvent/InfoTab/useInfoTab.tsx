import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateCategory = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
});

const useInfotab = () => {
  // create control form for SchemaUpdateCategory
  const {
    control: controlUpdateInfo, // use for controlling handling value form
    handleSubmit: handleSubmitUpdateInfo, // use for handling submit form (validate first then call function)
    formState: { errors: errorsUpdateInfo }, // use for getting error message from validation
    reset: resetUpdateInfo, // use for reset form
    setValue: setValueUpdateInfo, 
  } = useForm({
    resolver: yupResolver(schemaUpdateCategory), // resolver validation by yup schema
  });
  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    handleSubmitUpdateInfo,
  };
};

export default useInfotab;
