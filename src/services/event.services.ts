import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const eventServices = {
    getALlEvents: (params?: string) => 
        instance.get(`${endpoint.EVENT}?${params}`),
}

export default eventServices;