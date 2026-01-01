import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useEvent = () => {
    const [selectedId, setSelectedId] = useState<string>("");
    const router = useRouter();
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getEvents = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`; // construct query params

        // add search param if exists
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }

        // call event service to get events
        const res = await eventServices.getALlEvents(params);
        const { data } = res;
        return data;
    }

    // use useQuery to fetch data and make is easier to manage state
    const {
        // rename the returned values to avoid conflict when multiple useQuery is used
        data: dataEvent,
        isLoading: isLoadingEvent,
        isRefetching: isRefetchingEvent,
        refetch: refetchEvent,
    } = useQuery({
        queryKey: ['Event', currentPage, currentLimit, currentSearch], // for caching and identifying the query ex. ['Event', 1, 10, 'exampleSearch']
        queryFn: getEvents, // for fetching data, but must be return a promise
        enabled: router.isReady && !!currentPage && !!currentLimit, // is a dependency the useQuery is run by that value or condition is true
    })

    return {
        dataEvent,
        isLoadingEvent,
        isRefetchingEvent,
        refetchEvent,
        selectedId,
        setSelectedId,
    };
}

export default useEvent;