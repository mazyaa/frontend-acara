import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
    const router = useRouter();
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getMemberTransactions = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;

        const res = await orderServices.getMemberOrder(params);

        const { data } = res;

        return data;
    };

    // use useQuery to fetch data and make is easier to manage state
    const { 
        data: dataTransactions,
        isLoading: isLoadingTransactions, 
        isRefetching: isRefetchingTransactions, 
        refetch: refetchTransactions,
    } = useQuery({
        queryKey: ['MemberTransactions', currentPage, currentLimit, currentSearch], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
        queryFn: getMemberTransactions, // for fetching data, but must be return a promise
        enabled: router.isReady && !!currentPage && !!currentLimit, // is a dependency the useQuery is run by that value or condition is true
    });


    return {
        dataTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
        refetchTransactions,
    }
};

export default useTransaction;