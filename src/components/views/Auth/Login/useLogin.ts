import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ToasterContext } from "@/context/ToasterContext";


const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your username or email"),
  password: yup
    .string()
    .required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const callbackUrl : string = (router.query.callbackUrl as string) || "/";
  const { setToaster } = useContext(ToasterContext);

  // hooks from react for form handling
  //destructuring control, handleSubmit, formState, reset, setError from useForm
  const {
    control, // for controlling form inputs (get value, set value, etc.)
    handleSubmit,
    formState: { errors },
    reset,
    setError, // handling error manually from api response
  } = useForm({
    resolver: yupResolver(loginSchema), // use function yupResolver form validation previously defined schema
  });

  // function for registering user
  const loginServices = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
        redirect: false,
        callbackUrl,
    });
    if (result?.error && result?.status === 401) {
        throw new Error("Email or username is not matched with your password");
    }
  }

  // useMutation from react-query for handling requests (POST) 
  const {mutate: mutateLogin, isPending: isPendingLogin} = useMutation({
    mutationFn: loginServices,
    onError(error) {
      setToaster({
        type: "error",
        message: (error as Error).message
      })
    },
    onSuccess: () => {
      reset(); // reset form after successful registration
      setToaster({
        type: "success",
        message: "Login successfully!"
      });
      router.push(callbackUrl); // redirect to callback URL after successful login
    }
  });

  // function for handling form submission
    const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
