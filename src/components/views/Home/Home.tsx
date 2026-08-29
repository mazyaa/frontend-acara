import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import HomeEventList from "./HomeEventList";
import { Skeleton } from "@heroui/react";
import Image from "next/image";
import HomeCategoryList from "./HomeCategoryList";

const HomePage = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataCategories,
    isLoadingCategories,
  } = useHome();

  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      />
      <HomeEventList
        title="Featured Events"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
        urlMore="/event?isFeatured=true"
      />
      <Skeleton
        isLoaded={!isLoadingBanners}
        className="mb-16 h-[20vw] w-full rounded-2xl px-6 lg:px-0"
      >
        <Image
          src={dataBanners && dataBanners?.data[1]?.image}
          alt="banner"
          className="h-[20vw] rounded-2xl object-cover w-full"
          width={1920}
          height={800}
        />
      </Skeleton>
      <HomeEventList
        title="Latest Events"
        events={dataLatestEvents?.data}
        isLoading={isLoadingLatestEvents}
      />
      <HomeCategoryList
        categories={dataCategories?.data}
        isLoading={isLoadingCategories}
      />
    </div>
  );
};

export default HomePage;
