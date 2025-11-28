import { ICategory } from "@/types/Category";
import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const categoryServices = {
    getCategories: (params?: string) => 
        instance.get(`${endpoint.CATEGORY}?${params}`),
    getCategoryById: (id: string) => 
        instance.get(`${endpoint.CATEGORY}/${id}`),
    addCategory: (payload: ICategory) => 
        instance.post(endpoint.CATEGORY, payload),
    deleteCategory: (id: string) =>
        instance.delete(`${endpoint.CATEGORY}/${id}`),
}

export default categoryServices;