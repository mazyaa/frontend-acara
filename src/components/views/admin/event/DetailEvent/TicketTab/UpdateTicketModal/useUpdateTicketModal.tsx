import { ToasterContext } from "@/context/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  price: yup.string().required("Please input price"),
  quantity: yup.string().required("Please input quantity"),
  description: yup.string().required("Please input description"),
});

const useUpdateTicketModal = (id: string) => {
  const { setToaster } = useContext(ToasterContext);
  const { query } = useRouter();

  // create control form
  const {
    control, // use for controlling handling value form
    handleSubmit: handleSubmitForm, // use for handling submit form (validate first then call function)
    formState: { errors }, // use for getting error message from validation
    reset, // use for reset form
    setValue: setValueUpdateTicket,
  } = useForm({
    resolver: yupResolver(schema), // resolver validation by yup schema
  });

  const updateTicket = async (payload: ITicket) => {
    const response = await ticketServices.updateTicket(id, payload);

    return response;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingMutateUpdateTicket,
    isSuccess: isSuccessMutateUpdateTicket,
  } = useMutation({
    mutationFn: updateTicket,
    onError: (error) => {
      setToaster({
        type: "error",
        message: (error as Error).message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Successsfully update ticket",
      });
      reset(); // use reset for reset form after success
    },
  });

  const handleUpdateTicket = (data: ITicket) => {
    data.events = `${query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateUpdateTicket(data);
  }

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateTicket,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    setValueUpdateTicket,
  };
};

export default useUpdateTicketModal;
