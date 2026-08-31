import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket } from "@/types/Ticket";

const ticketServices = {
    getAllTickets: (params?: string) => 
        instance.get(`${endpoint.TICKET}s?${params}`),
    addTicket: (payload: ITicket) => 
        instance.post(`${endpoint.TICKET}`, payload),
    getTicketById: (id: string) => 
        instance.get(`${endpoint.TICKET}/${id}`),
    updateTicket: (id: string, payload: ITicket) => 
        instance.put(`${endpoint.TICKET}/${id}`, payload),
    deleteTicket: (id: string) => 
        instance.delete(`${endpoint.TICKET}/${id}`),
    getTicketsByEventId: (id: string) => 
        instance.get(`${endpoint.TICKET}/${id}/events`)
}

export default ticketServices;