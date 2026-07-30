import useChangeUrl from "@/hooks/useChangeUrl";
import bannerServices from "@/services/banner.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useBanner = () => {
    const [ selectedId, setSelectedId ] = useState<string>("");
    const router = useRouter();
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getBanners = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;

        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }

        const res = await bannerServices.getBanners(params);

        const { data } = res;

        return data;
    };

    // use useQuery to fetch data and make is easier to manage state
    const { 
        data: dataBanner,
        isLoading: isLoadingBanner, 
        isRefetching: isRefetchingBanner, 
        refetch: refetchBanner ,
    } = useQuery({
        queryKey: ['Banners', currentPage, currentLimit, currentSearch], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
        queryFn: getBanners, // for fetching data, but must be return a promise
        enabled: router.isReady && !!currentPage && !!currentLimit, // is a dependency the useQuery is run by that value or condition is true
    });


    return {
        dataBanner,
        isLoadingBanner,
        isRefetchingBanner,
        refetchBanner,
        selectedId,
        setSelectedId,
    }
};

export default useBanner;