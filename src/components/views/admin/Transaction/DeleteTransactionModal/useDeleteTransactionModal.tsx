import { ToasterContext } from "@/context/ToasterContext";
import orderServices from "@/services/order.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useDeleteTransactionModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTransaction = async (id: string) => {
    const res = await orderServices.deleteOrder(id);
    return res;
  };

  const {
    mutate: mutateDeleteTransaction, // set alias for mutate function
    isPending: isPendingMutateDeleteTransaction, // set alias for isPending
    isSuccess: isSuccessDeleteTransaction, // set alias for isSuccess 
  } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Transaction deleted successfully!",
      });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
  });

  return {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessDeleteTransaction,
  };
};
