import { ToasterContext } from "@/context/ToasterContext";
import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Please insert your old password"),
  password: yup.string().required("Please insert your new password"),
  confirmPassword: yup.string().required("Please insert your confirm password"),
});

const useSecurityTab = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control: controlUpdatePassword, // use for controlling handling value form
    handleSubmit: handleSubmitUpdatePassword, // use for handling submit form (validate first then call function)
    formState: { errors: errorsUpdatePassword }, // use for getting error message from validation
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword), // resolver validation by yup schema
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);

    return data.data;
  };

  const { mutate: mutateUpdatePassword, isPending: isPendingMutateUpdatePassword } =
    useMutation({
        mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
        onError: (error: any) => {
          setToaster({
            type: "error",
            message: error.message || "Failed to update password",
          });
        },
        onSuccess: () => {
            resetUpdatePassword();
            setValueUpdatePassword("oldPassword", "");
            setValueUpdatePassword("password", "");
            setValueUpdatePassword("confirmPassword", "");
            setToaster({
                type: "success",
                message: "Password updated successfully",
            })
        }
    });

    const handleUpdatePassword = (data: IUpdatePassword) => {
        mutateUpdatePassword(data);
    }

  return {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  };
};

export default useSecurityTab;
