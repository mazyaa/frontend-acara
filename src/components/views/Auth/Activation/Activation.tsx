import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;

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
          src={
            status === "success"
              ? "/images/ilustration/success.svg"
              : "/images/ilustration/pending.svg"
          }
          alt="email send"
          width={200}
          height={200}
        />

        <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-xl font-bold text-danger">
            {status === "success" ? "Activation Success" : "Activation Failed"}
          </h1>
          <p className="text-small font-semibold text-default-500">
            {status === "success"
              ? "Thank you for registering your account in Acara"
              : "Confirmation code is invalid or has expired."}
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

export default Activation;
