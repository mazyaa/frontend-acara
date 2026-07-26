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

const useAddTicketModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const { query } = useRouter();

  // create control form
  const {
    control, // use for controlling handling value form
    handleSubmit: handleSubmitForm, // use for handling submit form (validate first then call function)
    formState: { errors }, // use for getting error message from validation
    reset, // use for reset form
  } = useForm({
    resolver: yupResolver(schema), // resolver validation by yup schema
  });

  const addTicket = async (payload: ITicket) => {
    const response = await ticketServices.addTicket(payload);

    return response;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingMutateAddTicket,
    isSuccess: isSuccessMutateAddTicket,
  } = useMutation({
    mutationFn: addTicket,
    onError: (error) => {
      setToaster({
        type: "error",
        message: (error as Error).message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Successsfully added ticket",
      });
      reset(); // use reset for reset form after success
    },
  });

  const handleAddTicket = (data: ITicket) => {
    data.events = `${query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateAddTicket(data);
  }

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddTicket,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
  };
};

export default useAddTicketModal;
