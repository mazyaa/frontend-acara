import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import authServices from "@/services/auth.service";


const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your full name"),
  userName: yup.string().required("Please input your username"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please input your email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  // function for getting key password visibility and changing its value by parameter
  // key can be 'password' or 'confirmPassword'
  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword, // get previous state
      [key]: !visiblePassword[key], // set or update or assign 'object state' by key from parameter
    });
  };

  // hooks from react for form handling
  //destructuring control, handleSubmit, formState, reset, setError from useForm
  const {
    control, // for controlling form inputs (get value, set value, etc.)
    handleSubmit, // for handling form submission (error handling, etc.)
    formState: { errors },
    reset,
    setError, // handling error manually from api response
  } = useForm({
    resolver: yupResolver(registerSchema), // use function yupResolver form validation previously defined schema
  });

  // function for registering user
  const registerServices = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  }

  // useMutation from react-query for handling requests (POST, GET, DELETE, etc.) 
  const {mutate: mutateRegister, isPending: isPendingRegister} = useMutation({
    mutationFn: registerServices,
    onError(error) {
      setError("root", {
        message: error.message
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset(); // reset form after successful registration
    }
  });

  // function for handling form submission
  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
