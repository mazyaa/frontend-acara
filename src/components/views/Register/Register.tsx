import Image from "next/image";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import useRegister from "./useRegister";

const Register = () => {
  const { visiblePassword, handleVisiblePassword } = useRegister();
  return (
    <>
      <div className="flex flex-col lg:flex-row h-full items-center justify-center gap-10 lg:gap-20 py-10">
        <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-5">
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
            <form className="mt-4 w-80 flex flex-col gap-4">
              <Input
                type="text"
                label="Full Name"
                variant="bordered"
                className="w-80"
                autoComplete="off"
              />
              <Input
                type="text"
                label="Username"
                variant="bordered"
                className="w-80"
                autoComplete="off"
              />
              <Input
                type="email"
                label="Email"
                variant="bordered"
                className="w-80"
                autoComplete="off"
              />
              <Input
                type={visiblePassword.password ? "text" : "password"}
                label="Password"
                variant="bordered"
                className="w-80"
                autoComplete="off"
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
              <Input
                type={visiblePassword.confirmPassword ? "text" : "password"}
                label="Confirm Password"
                variant="bordered"
                className="w-80"
                autoComplete="off"
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

              <Button color="danger" size="lg" type="submit"className="w-80">
                Register
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Register;
