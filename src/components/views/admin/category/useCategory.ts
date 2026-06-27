import useChangeUrl from "@/hooks/useChangeUrl";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCategory = () => {
    const [ selectedId, setSelectedId ] = useState<string>("");
    const router = useRouter();
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getCategories = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await categoryServices.getCategories(params);
        const { data } = res;
        return data;
    };

    // use useQuery to fetch data and make is easier to manage state
    const { 
        // rename the returned values to avoid conflict when multiple useQuery is used
        data: dataCategory,
        isLoading: isLoadingCategory, 
        isRefetching: isRefetchingCategory, 
        refetch: refetchCategory ,
    } = useQuery({
        queryKey: ['Categories', currentPage, currentLimit, currentSearch], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
        queryFn: getCategories, // for fetching data, but must be return a promise
        enabled: router.isReady && !!currentPage && !!currentLimit, // is a dependency the useQuery is run by that value or condition is true
    });


    return {
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategory,
        selectedId,
        setSelectedId,
    }
};

export default useCategory;