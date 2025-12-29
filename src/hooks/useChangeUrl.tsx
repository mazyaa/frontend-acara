import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
    const router = useRouter();
     const debounce= useDebounce(); // use debounce works for delay input, must use debounce because if not, it will call api every key stroke
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
}