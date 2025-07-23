import Image from "next/image";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/react";
import Link from "next/link";
import useLogin from "./useLogin";
import cn from "@/utils/cn";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();
  return (
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
        <CardBody className="p-4 lg:p-8">
          <div className="mb-5 flex flex-col">
            <h1 className="text-xl font-bold text-danger-500 lg:text-2xl">
              Create Account
            </h1>
            <p className="text-small">
              Don&apos;t have an account?&nbsp;
              <Link
                href="/auth/register"
                className="font-semibold text-danger-400"
              >
                Register Here
              </Link>
            </p>
          </div>

          {errors.root && (
            <p className="mb-2 text-sm font-medium text-danger">
              {errors?.root?.message}
            </p>
          )}

          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-3",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email or Username"
                  variant="bordered"
                  className="mb-4"
                  autoComplete="off"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  className="mb-4"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => toggleVisibility()}
                    >
                      {isVisible ? (
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
              {isPendingLogin ? (
                <Spinner
                  color="default"
                  className="mb-3 h-5 w-5"
                  variant="wave"
                />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
