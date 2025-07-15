import Image from "next/image";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/react";
import Link from "next/link";
import useRegister from "./useRegister";
import cn from "@/utils/cn";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

  console.log("Register errors:", errors);
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center gap-10 py-10 lg:flex-row lg:gap-20">
        <div className="flex w-full flex-col items-center justify-center gap-5 lg:w-1/3">
          <Image
            src="/images/general/logo.svg"
            alt="Logo"
            width={180}
            height={180}
            className="mb-4"
          />
          <Image
            src="/images/ilustration/login.svg"
            alt="Login"
            width={1024}
            height={1024}
            className="w-2/3 lg:w-full"
          />
        </div>
        <Card>
          <CardBody className="p-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-danger-500">
                Create Account
              </h1>
              <p className="text-small">
                Have An Account?&nbsp;
                <Link
                  href="/auth/login"
                  className="font-semibold text-danger-400"
                >
                  Login Here
                </Link>
              </p>
            </div>
            {errors.root && (
              <p className="mb-2 font-medium text-danger">
                {errors?.root?.message}
              </p>
            )}
            <form
              className={cn(
                "flex w-80 flex-col",
                Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
              )}
              onSubmit={handleSubmit(handleRegister)}
            >
              {/* Full Name Input */}
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Full Name"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.fullName !== undefined}
                    errorMessage={errors.fullName?.message}
                  />
                )}
              />

              {/* User Name Input */}
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="User Name"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.userName !== undefined}
                    errorMessage={errors.userName?.message}
                  />
                )}
              />

              {/* Email Input */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Email"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.email !== undefined}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              {/* Password Input */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={visiblePassword.password ? "text" : "password"}
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("password")}
                      >
                        {visiblePassword.password ? (
                          <FaEye className="text-xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="text-xl text-danger-500" />
                        )}
                      </button>
                    }
                  />
                )}
              />

              {/* Confirm Password Input */}
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={visiblePassword.confirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.confirmPassword !== undefined}
                    errorMessage={errors.confirmPassword?.message}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("confirmPassword")}
                      >
                        {visiblePassword.confirmPassword ? (
                          <FaEye className="text-xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="text-xl text-danger-500" />
                        )}
                      </button>
                    }
                  />
                )}
              />

              <Button color="danger" size="lg" type="submit">
                {isPendingRegister ? (
                  <Spinner
                    color="default"
                    className="mb-3 h-5 w-5"
                    variant="wave"
                  />
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Register;
