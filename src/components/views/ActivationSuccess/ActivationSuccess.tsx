import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const ActivationSuccess = () => {
  const router = useRouter();

  return (
    <div className="flex w-screen flex-col">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={150}
          height={150}
          className="mb-4"
        />

        <Image
          src="/images/ilustration/success.svg"
          alt="email send"
          width={200}
          height={200}
        />

        <div className="items-center mt-4 flex flex-col justify-center gap-2 text-center">
          <h1 className="text-xl font-bold text-danger">Activation Success</h1>
          <p className="text-small font-semibold text-default-500">
            Thank you for register account in Acara
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
    </div>
  );
};

export default ActivationSuccess;