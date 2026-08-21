import { LIMIT_BANNER, PAGE_DEFAULT } from "@/constants/list.constants";
import bannerServices from "@/services/banner.services";
import { useQuery } from "@tanstack/react-query";


const useHome = () => {
    const getBanners = async () => {
        let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

        const res = await bannerServices.getBanners(params);

        const { data } = res;

        return data;
    };

    // use useQuery to fetch data and make is easier to manage state
    const { 
        data: dataBanners,
        isLoading: isLoadingBanners, 
    } = useQuery({
        queryKey: ['Banners'], 
        queryFn: getBanners, // for fetching data, but must be return a promise
    });

    return {
        dataBanners,
        isLoadingBanners,
    }
};

export default useHome;