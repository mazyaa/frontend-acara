import eventServices from "@/services/event.services";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
    const router = useRouter();

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
    const { data } = await ticketServices.getTicketsByEventId(`${dataDetailEvent?._id}`);

    return data.data;
  };

  const { data: dataTicket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["Tickets"], // unique key for the query
    queryFn: getTicketsByEventId, // fetch event by id from the query parameters
    enabled: !!dataDetailEvent?._id
  });

  return {
    dataDetailEvent,
    isLoadingDetailEvent,
    dataTicket,
    isLoadingTicket
  };
};

export default useDetailEvent;