import Image from "next/image";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";

const Login = () => {
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

          <form className="flex w-80 flex-col gap-4">
            <Input
              type="text"
              name="identifier"
              placeholder="Username or Email"
            />

            <Input type="password" name="password" placeholder="Password" />

            <Button color="danger" size="lg" type="submit">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
