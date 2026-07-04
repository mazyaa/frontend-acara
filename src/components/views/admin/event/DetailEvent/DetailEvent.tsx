import { Tab, Tabs } from "@heroui/react";
import BannerTab from "./BannerTab/BannerTab";
import useDetailEvent from "./useDetailEvent";

const DetailEvent = () => {
  const {
    dataEvent,

    handleUpdateEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
  } = useDetailEvent();

  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Cover">
        <BannerTab
          currentBanner={dataEvent?.banner}
          name={dataEvent?.name}
          isPendingUpdate={isPendingMutateUpdateEvent}
          onUpdate={handleUpdateEvent}
          isSuccessUpdateBanner={isSuccessMutateUpdateEvent}
        />
      </Tab>
      {/* <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          name={dataEvent?.name}
          isPendingUpdate={isPendingMutateUpdateEvent}
          onUpdate={handleUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab> */}
      {/* <Tab key="location" title="Location">
                Location
            </Tab> */}
    </Tabs>
  );
};

export default DetailEvent;
