import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useCategory = () => {
    const router = useRouter();
    const debounce= useDebounce();
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
    };

    // use useQuery to fetch data and make is easier to manage state
    // useQuery = (queryKey, queryFn, options)
    // queryKey = unique key to identify the query
    // queryFn = function to fetch data
    // options = { enabled: boolean } to enable or disable the query
    const { 
        data: dataCategory,
        isLoading: isLoadingCategory, 
        isRefetching: isRefetchingCategory, 
        refetch: refetchCategory ,
    } = useQuery({
        queryKey: ['Category', currentPage, currentLimit, currentSearch],
        queryFn: getCategories,
        enabled: router.isReady && !!currentPage && !!currentLimit, // use !! = must be true
    });

    // for handle change page pagination
    const handleChangePage = (page: number) => {
        router.push({
            query: { // use query for change url without reload page
                ...router.query,
                page,
            }
        });
    };

    // for handle change limit and reset page to 1 if limit change
    const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedLimit = e.target.value;
        router.push({ 
            query: { // use query for change url without reload page
                ...router.query,
                limit: selectedLimit,
                page: PAGE_DEFAULT,
            }
        })
    };

    // debounce search input
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
            const search = e.target.value;
            router.push({
                query: { // use query for change url without reload page 
                    ...router.query,
                    search,
                    page: PAGE_DEFAULT,
                }
            });
        }, DELAY);
    };

    // for clear search input
    const handleClearSearch = () => {
        router.push({
            query: { // use query for change url without reload page
                ...router.query,
                search: '',
                page: PAGE_DEFAULT,
            }
        });
    };

    return {
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategory,
        
        setURL,
        currentPage,
        currentLimit,
        currentSearch,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    }
};

export default useCategory;