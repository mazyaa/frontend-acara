import eventServices from "@/services/event.services";
import orderServices from "@/services/order.services";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
      const router = useRouter();

       const getOrderById = async () => {
        const { data } = await orderServices.getOrderById(`${router.query.id}`);
    
        return data.data;
      };
    
      const { data: dataTransaction } = useQuery({
        queryKey: ["Transaction"], // unique key for the query
        queryFn: getOrderById, // fetch event by id from the query parameters
        enabled: router.isReady,
      });

      const getEventById = async () => {
        const { data } = await eventServices.getEventById(`${dataTransaction?.events}`);
    
        return data.data;
      };
    
      const { data: dataEvent } = useQuery({
        queryKey: ["EventById"], // unique key for the query
        queryFn: getEventById, // fetch event by id from the query parameters
        enabled: !!dataTransaction?.ticket,
      });
    
      const getTicketsById = async () => {
        const { data } = await ticketServices.getTicketById(
          `${dataTransaction?.ticket}`,
        );
    
        return data.data;
      };
    
      const { data: dataTicket } = useQuery({
        queryKey: ["Tickets"], // unique key for the query
        queryFn: getTicketsById,
        enabled: !!dataTransaction?.ticket,
      });
    return {
        dataTransaction,
        dataEvent,
        dataTicket,
    }
};

export default useDetailTransaction;