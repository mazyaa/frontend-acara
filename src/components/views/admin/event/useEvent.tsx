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
    // useQuery = (queryKey, queryFn, options)
    // queryKey = unique key to identify the query
    // queryFn = function to fetch data
    // options = { enabled: boolean } to enable or disable the query
    const {
        data: dataEvent,
        isLoading: isLoadingEvent,
        isRefetching: isRefetchingEvent,
        refetch: refetchEvent,
    } = useQuery({
        queryKey: ['Event', currentPage, currentLimit, currentSearch],
        queryFn: getEvents,
        enabled: router.isReady && !!currentPage && !!currentLimit,
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