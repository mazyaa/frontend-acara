import { Tab, Tabs } from "@heroui/react";
import BannerTab from "./BannerTab";
import useDetailEvent from "./useDetailEvent";
import InfoTab from "./InfoTab";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";

const DetailEvent = () => {
  const {
    dataEvent,

    handleUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,

    dataDefaultRegion,
    isPendingDefaultRegion,
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
      <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          name={dataEvent?.name}
          isPendingUpdate={isPendingMutateUpdateEvent}
          onUpdate={handleUpdateInfo}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>

      <Tab key="location" title="Location">
        <LocationTab
          dataEvent={dataEvent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          isPendingUpdate={isPendingMutateUpdateEvent}
          onUpdate={handleUpdateLocation}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>

      <Tab key="ticket" title="Ticket">
        <TicketTab />
      </Tab>
      
    </Tabs>
  );
};

export default DetailEvent;
