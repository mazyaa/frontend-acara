import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
    getAllEvents: (params?: string) => 
        instance.get(`${endpoint.EVENT}s?${params}`),
    addEvent: (payload: IEvent) => 
        instance.post(`${endpoint.EVENT}`, payload),
    getEventById: (id: string) => 
        instance.get(`${endpoint.EVENT}/${id}`),
    getEventBySlug: (slug: string) => 
        instance.get(`${endpoint.EVENT}/${slug}/slug`),
    updateEvent: (id: string, payload: IEvent) => 
        instance.put(`${endpoint.EVENT}/${id}`, payload),
    searchLocationByRegency: (name: string) => 
        instance.get(`${endpoint.REGION}-search?name=${name}`),
    deleteEvent: (id: string) => 
        instance.delete(`${endpoint.EVENT}/${id}`),
    getRegencyById: (id: string) => 
        instance.get(`${endpoint.REGION}/${id}/regency`)
}

export default eventServices;