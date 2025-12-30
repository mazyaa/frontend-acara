import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
    const router = useRouter();
    const debounce = useDebounce(); // use debounce works for delay input, must use debounce because if not, it will call api every key stroke

    // get current query params
    const currentLimit = router.query.limit; // for get current limit use in select option
    const currentPage = router.query.page; // for get current page use in pagination
    const currentSearch = router.query.search; // for get current search use in input search

    // for setting url with default values if no query params
    const setUrl = () => {
        router.replace({
            query: {
                limit: currentLimit || LIMIT_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                search: currentSearch || '',
            }
        });
    };

     // for handle change page pagination so if user click page number it will change url query params page
    const handleChangePage = (page: number) => {
        router.push({
            query: { // use query for change url without reload page
                ...router.query,
                page,
            }
        });
    };

    // for handle change limit so if user change limit it will change url query params limit and reset page to 1
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

    // debounce search input so if user type it will wait for delay then call api
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

      // for clear search input so if user click clear button it will remove search query params and reset page to 1
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
        setUrl,
        handleChangePage,
        handleChangeLimit,
        handleSearch,
        handleClearSearch,
    }
}

export default useChangeUrl;