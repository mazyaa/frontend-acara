import { LIMIT_BANNER, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";
import bannerServices from "@/services/banner.services";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.services";
import { useQuery } from "@tanstack/react-query";


const useHome = () => {
    const getCategories = async () => {
        let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

        const res = await categoryServices.getCategories(params);

        const { data } = res;

        return data;
    };

    const { 
        data: dataCategories,
        isLoading: isLoadingCategories, 
    } = useQuery({
        queryKey: ['Categories'], 
        queryFn: getCategories, // for fetching data, but must be return a promise
    });

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


    const getEvents = async (params: string) => {
        const res = await eventServices.getAllEvents(params);

        const { data } = res;

        return data;
    };

    const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublished=true`;

    const { 
        data: dataLatestEvents,
        isLoading: isLoadingLatestEvents, 
    } = useQuery({
        queryKey: ['LatestEvents'],
        queryFn: () => getEvents(currentEventQuery), // for fetching data, but must be return a promise
    });

    const { 
        data: dataFeaturedEvents,
        isLoading: isLoadingFeaturedEvents, 
    } = useQuery({
        queryKey: ['FeaturedEvents'],
        queryFn: () => getEvents(`${currentEventQuery}&isFeatured=true`), // for fetching data, but must be return a promise
    });

    return {
        dataBanners,
        isLoadingBanners,
        dataLatestEvents,
        isLoadingLatestEvents,
        dataFeaturedEvents,
        isLoadingFeaturedEvents,
        dataCategories,
        isLoadingCategories,
    }
};

export default useHome;