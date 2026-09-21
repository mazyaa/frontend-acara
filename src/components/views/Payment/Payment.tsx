import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
  const router = useRouter();
  const { mutateUpdateOrderStatus } = usePayment();
  const { status, order_id } = router.query;

  useEffect(() => {
    if(router.isReady) {
        mutateUpdateOrderStatus();
    }
  }, [router.isReady]);
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
          alt="payment status image"
          width={200}
          height={200}
        />

        <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-xl font-bold text-danger capitalize">Transaction {status}</h1>
          <p className="text-small font-semibold text-default-500">
            {status === "success"
              ? "Thank you for your payment"
              : `Your payment is ${status}, please wait for the confirmation from the admin`}
          </p>
          <Button
            variant="bordered"
            color="default"
            size="sm"
            className="mt-2 w-fit font-medium text-danger"
            onPress={() => router.push(`/member/transactions/${order_id}`)}
          >
            Check your transaction here
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
