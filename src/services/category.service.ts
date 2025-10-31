import { ICategory } from "@/types/Category";
import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const categoryServices = {
    getCategories: (params?: string) => 
        instance.get(`${endpoint.CATEGORY}?${params}`),
    addCategory: (payload: ICategory) => 
        instance.post(endpoint.CATEGORY, payload),
}

export default categoryServices;