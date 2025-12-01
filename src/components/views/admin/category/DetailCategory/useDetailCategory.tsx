import categoryServices from "@/services/category.service";
import { useRouter } from "next/router";

const useDetailCategory = () => {
    const {query, isReady} = useRouter(); // destructure query and isReady from useRouter for handling dynamic routes

    const getCategoryById = async (id: string) => {
        const {data} = await categoryServices.getCategoryById(id);
        
        return data.data;
    };
 }