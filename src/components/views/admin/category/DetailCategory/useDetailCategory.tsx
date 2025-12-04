import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailCategory = () => {
    const {query, isReady} = useRouter(); // destructure query and isReady from useRouter for handling dynamic routes

    const getCategoryById = async (id: string) => {
        const {data} = await categoryServices.getCategoryById(id);
        
        return data.data;
    };

    const {data: dataCategory} = useQuery({ // use useQuery to fetch category details
        queryKey: ['category'], // unique key for the query
        queryFn: () => getCategoryById(`${query.id}`), // fetch category by id from the query parameters
        enabled: isReady, // ensure the query runs only when the router is ready
    });

    return {
        dataCategory,
    };
 }

 export default useDetailCategory;