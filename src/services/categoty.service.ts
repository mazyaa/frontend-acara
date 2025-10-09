import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const catgoryServices = {
    getAllCategories: (params?: string) => 
        instance.get(`${endpoint.CATEGORY}?${params}`),
}