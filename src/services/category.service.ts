import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const categoryServices = {
    getCategories: (params?: string) => 
        instance.get(`${endpoint.CATEGORY}?${params}`),
}

export default categoryServices;