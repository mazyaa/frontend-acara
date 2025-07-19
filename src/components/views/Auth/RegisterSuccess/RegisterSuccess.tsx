import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex w-screen flex-col">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="Logo"
          width={150}
          height={150}
          className="mb-4"
        />
        <Image
          src="/images/ilustration/email-send.svg"
          alt="email send"
          width={300}
          height={300}
        />
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-xl font-bold text-danger">
          Create Account Success
        </h1>
        <p className="text-small font-semibold text-default-500">
          Check your email for account activation
        </p>
        <Button
          variant="bordered"
          color="default"
          size="sm"
          className="mt-2 w-fit font-medium text-danger"
          onClick={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
