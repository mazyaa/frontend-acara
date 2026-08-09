import { Tab, Tabs } from "@heroui/react";
import IconTab from "./ImageTab";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";
import ImageTab from "./ImageTab/ImageTab";

const DetailBanner = () => {
  const {
    dataBanner,

    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  } = useDetailBanner();

  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Cover">
        <ImageTab
          currentImage={dataBanner?.image}
          name={dataBanner?.name}
          isPendingUpdate={isPendingMutateUpdateBanner}
          onUpdate={handleUpdateBanner}
          isSuccessUpdateImage={isSuccessMutateUpdateBanner}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataBanner={dataBanner}
          name={dataBanner?.name}
          isPendingUpdate={isPendingMutateUpdateBanner}
          onUpdate={handleUpdateBanner}
          isSuccessUpdate={isSuccessMutateUpdateBanner}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
