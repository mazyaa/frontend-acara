import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCategory = () => {
    const router = useRouter();
    const currentLimit = router.query.limit;
    const currentPage = router.query.page;
    const currentSearch = router.query.search;

    const setURL = () => {
        router.replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                search: currentSearch || '',
            }
        });
    };

    const getCategories = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await categoryServices.getCategories(params);
        const { data } = res;
        return data;
    }

    // use useQuery to fetch data and make is easier to manage state
    // useQuery = (queryKey, queryFn, options)
    // queryKey = unique key to identify the query
    // queryFn = function to fetch data
    // options = { enabled: boolean } to enable or disable the query
    const { 
        data: dataCategory,
        isLoading: isLoadingCategory, 
        isRefetching: isRefetchingCategory, 
        refetch: refetchCategory 
    } = useQuery({
        queryKey: ['Category', currentPage, currentLimit, currentSearch],
        queryFn: getCategories,
        enabled: router.isReady && !!currentPage && !!currentLimit, // use !! = must be true
    });

    return {
        dataCategory,
        isLoadingCategory,
        refetchCategory,
        
        setURL,
    }
};

export default useCategory;