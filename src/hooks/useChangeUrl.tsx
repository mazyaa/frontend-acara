import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce(); // use debounce works for delay input, must use debounce because if not, it will call api every key stroke

  // get current query params
  const currentLimit = router.query.limit; // for get current limit use in select option
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentCategory = router.query.category;
  const currentIsOnline = router.query.isOnline;
  const currentIsFeatured = router.query.isFeatured;

  // for setting url with default values if no query params
  const setUrl = () => {
    router.replace({
      // replace is use for change url without reload page, if use push it will reload page
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const setUrlExplore = () => {
    router.replace({
      // replace is use for change url without reload page, if use push it will reload page
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
        category: currentCategory || "",
        isOnline: currentIsOnline || "",
        isFeatured: currentIsFeatured || "",
        isPublish: true,
      },
    });
  };

  // for handle change page pagination so if user click page number it will change url query params page
  const handleChangePage = (page: number) => {
    router.push({
      query: {
        // use query for change url without reload page
        ...router.query,
        page,
      },
    });
  };

  // for handle change limit so if user change limit it will change url query params limit and reset page to 1
  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        // use query for change url without reload page
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeCategory = (category: string) => {
    router.push({
      query: {
        ...router.query, // get current query params and add new category query params
        category,
        page: PAGE_DEFAULT, // set page to 1 because if user change category it will reset page to 1
      },
    });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    router.push({
      query: {
        ...router.query, // get current query params and add new isOnline query params
        isOnline,
        page: PAGE_DEFAULT, // set page to 1 because if user change isOnline it will reset page to 1
      },
    });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    router.push({
      query: {
        ...router.query, // get current query params and add new isFeatured query params
        isFeatured,
        page: PAGE_DEFAULT, // set page to 1 because if user change isFeatured it will reset page to 1
      },
    });
  };

  // debounce search input so if user type it will wait for delay then call api
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          // use query for change url without reload page
          ...router.query,
          search,
          page: PAGE_DEFAULT, // set page to 1 because if user search it will reset page to 1
        },
      });
    }, DELAY);
  };

  // for clear search input so if user click clear button it will remove search query params and reset page to 1
  const handleClearSearch = () => {
    router.push({
      query: {
        // use query for change url without reload page
        ...router.query,
        search: "",
        page: PAGE_DEFAULT, // set page to 1 because if user clear search it will reset page to 1
      },
    });
  };

  return {
    currentLimit,
    currentPage,
    currentSearch,

    setUrl,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,

    setUrlExplore,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
  };
};

export default useChangeUrl;
