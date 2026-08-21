import HomeSlider from "./HomeSlider";
import useHome from "./HomeSlider/useHome";

const HomePage = () => {
    const { dataBanners, isLoadingBanners } = useHome();
    return (
        <div>
            <HomeSlider banners={dataBanners?.data} isLoadingBanners={isLoadingBanners} />
        </div>
    )
};

export default HomePage;