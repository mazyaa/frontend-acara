import { ICategory } from "@/types/Category";
import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const bannerServices = {
    getBanners: (params?: string) => 
        instance.get(`${endpoint.BANNER}?${params}`),
    getBannerById: (id: string) => 
        instance.get(`${endpoint.BANNER}/${id}`),
    addBanner: (payload: IBanner) => 
        instance.post(endpoint.BANNER, payload),
    updateBanner: (id: string, payload: IBanner) =>
        instance.put(`${endpoint.BANNER}/${id}`, payload),
    deleteBanner: (id: string) =>
        instance.delete(`${endpoint.BANNER}/${id}`),
}

export default bannerServices;