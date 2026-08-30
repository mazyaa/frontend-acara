import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import eventServices from "@/services/event.services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
    const session = useSession();
    const debounce = useDebounce();
    const [search, setSearch] = useState<string>("");
    const getProfileData = async () => {
        const { data } = await authServices.getProfile();

        return data.data;
    }

    const { data: dataProfile } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfileData,
        enabled: session.status === "authenticated",
    });

    const getEventSearch = async () => {
        const params = `search=${search}&limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublished=true`;

        const res = await eventServices.getAllEvents(params);

        const { data } = res;

        return data;
    };

    const { 
        data: dataEventsSearch,
        isLoading: isLoadingEventsSearch, 
        isRefetching: isRefetchingEventsSearch,
    } = useQuery({
        queryKey: ['EventsSearch', search], // add search as a dependency to the query key
        queryFn: () => getEventSearch(), // for fetching data, but must be return a promise
        enabled: !!search, // only run the query if search is not empty
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => setSearch(e.target.value), DELAY);
    }


    return {
        dataProfile,
        dataEventsSearch,
        isLoadingEventsSearch,
        isRefetchingEventsSearch,
        handleSearch,

        search,
        setSearch,
    };
};

export default useLandingPageLayoutNavbar;