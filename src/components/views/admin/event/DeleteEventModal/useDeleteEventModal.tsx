import { ToasterContext } from "@/context/ToasterContext";
import eventServices from "@/services/event.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useDeleteEventModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteEvent = async (id: string) => {
    const res = await eventServices.deleteEvent(id);
    return res;
  };

  const {
    mutate: mutateDeleteEvent, // set alias for mutate function
    isPending: isPendingMutateDeleteEvent, // set alias for isPending
    isSuccess: isSuccessDeleteEvent, // set alias for isSuccess 
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Event deleted successfully!",
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
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessDeleteEvent,
  };
};
