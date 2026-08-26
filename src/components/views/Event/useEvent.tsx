import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
    const router = useRouter();
    const { currentLimit, currentPage, currentCategory, currentIsFeatured, currentIsOnline } = useChangeUrl();

    const getEvents = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}&category=${currentCategory}&isFeatured=${currentIsFeatured}&isOnline=${currentIsOnline}&isPublish=true`; // construct query params
        const res = await eventServices.getAllEvents(params);
        const { data } = res;
        return data;
    }

    // use useQuery to fetch data and make is easier to manage state
    const {
        // rename the returned values to avoid conflict when multiple useQuery is used
        data: dataEvents,
        isLoading: isLoadingEvents,
        isRefetching: isRefetchingEvents,
    } = useQuery({
        queryKey: ['Events', currentPage, currentLimit, currentCategory, currentIsFeatured, currentIsOnline], // for caching
        queryFn: getEvents, // for fetching data, but must be return a promise
        enabled: router.isReady && !!currentPage && !!currentLimit, // is a dependency the useQuery is run by that value or condition is true
    })

    return {
        dataEvents,
        isLoadingEvents,
        isRefetchingEvents
    };
};

export default useEvent;