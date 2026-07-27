import { ToasterContext } from "@/context/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useDeleteTicketModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTicket = async (id: string) => {
    const res = await ticketServices.deleteTicket(id);

    return res;
  };

  const {
    mutate: mutateDeleteTicket, // set alias for mutate function
    isPending: isPendingMutateDeleteTicket, // set alias for isPending
    isSuccess: isSuccessDeleteTicket, // set alias for isSuccess 
  } = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Ticket deleted successfully!",
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
    mutateDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessDeleteTicket,
  };
};
