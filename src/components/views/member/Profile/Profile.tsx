import { Tab, Tabs } from "@heroui/react";
import useProfile from "./useProfile";
import PictureTab from "./PictureTab";
import InfoTab from "./InfoTab";
import SecurityTab from "./securityTab";

const DetailEvent = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useProfile();

  return (
    <Tabs aria-label="Options">
      <Tab key="picture" title="Picture">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          isPendingUpdate={isPendingMutateUpdateProfile}
          onUpdate={handleUpdateProfile}
          isSuccessUpdatePicture={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataProfile={dataProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          onUpdate={handleUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="security" title="Security">
        <SecurityTab />
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
