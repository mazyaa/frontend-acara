import { Tab, Tabs } from "@heroui/react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,

    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();
  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Cover">
        <IconTab currentIcon={dataCategory?.icon} name={dataCategory?.name} />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab dataCategory={dataCategory} />
      </Tab>
      {/* <Tab key="location" title="Location">
                Location
            </Tab> */}
    </Tabs>
  );
};

export default DetailCategory;
