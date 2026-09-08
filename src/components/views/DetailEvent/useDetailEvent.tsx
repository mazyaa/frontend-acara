import eventServices from "@/services/event.services";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { defaultCart } from "./DetailEvent.constants";
import { useContext, useMemo, useState } from "react";
import orderServices from "@/services/order.services";
import { ToasterContext } from "@/context/ToasterContext";

const useDetailEvent = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);

    return data.data;
  };

  const { data: dataDetailEvent, isLoading: isLoadingDetailEvent } = useQuery({
    queryKey: ["EventBySlug"], // unique key for the query
    queryFn: getEventBySlug, // fetch event by id from the query parameters
    enabled: router.isReady,
  });

  const getTicketsByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${dataDetailEvent?._id}`,
    );

    return data.data;
  };

  const { data: dataTicket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["Tickets"], // unique key for the query
    queryFn: getTicketsByEventId, // fetch event by id from the query parameters
    enabled: !!dataDetailEvent?._id,
  });

  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket); // find the ticket in the dataTicket array that matches the ticket in the cart
    }
    return null; // return null if dataTicket is undefined or if no matching ticket is found
  }, [dataTicket, cart]);

  // Function to handle adding a ticket to the cart
  // if used, it will make changes to the cart state, which will trigger a re-render dataTicketInCart to update the ticket in the cart
  const handleAddToCart = (ticket: string) => {
    setCart({
      events: `${dataDetailEvent?._id}`,
      ticket: ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prevCart: ICart) => ({
          ...prevCart,
          quantity: prevCart.quantity + 1,
        }));
      }
    } else if (cart.quantity <= 1) {
      setCart(defaultCart);
    } else {
      setCart((prevCart: ICart) => ({
        ...prevCart,
        quantity: prevCart.quantity - 1,
      }));
    }
  };

  const createOrder = async () => {
    const { data } = await orderServices.createOrder(cart);

    return data.data;
  };

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
      onSuccess: (result) => {
        const transactionToken = result.payment.token;
        (window as any).snap.pay(transactionToken);
      },
    });

  return {
    dataDetailEvent,
    dataTicket,

    handleAddToCart,
    handleChangeQuantity,
    cart,
    dataTicketInCart,

    mutateCreateOrder,
    isPendingCreateOrder,
  };
};

export default useDetailEvent;
