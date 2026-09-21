import orderServices from "@/services/order.services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePayment = () => {
  const router = useRouter();
  const standarizeStatus = (status: string) => {
    switch(status) {
        case "success":
            return "completed";
        case "progress":
            return "pending";
        case "failed":
            return "cancelled";
        default:
            return status;
    }
  }
  const { status, order_id } = router.query;
  const updateOrderStatus = async () => {
    const result = await orderServices.updateStatusTransaction(
      order_id as string,
      standarizeStatus(status as string),
    );
  };

  const { mutate: mutateUpdateOrderStatus } = useMutation({
    mutationFn: updateOrderStatus,
  });

  return {
    mutateUpdateOrderStatus,
  }
};

export default usePayment;
