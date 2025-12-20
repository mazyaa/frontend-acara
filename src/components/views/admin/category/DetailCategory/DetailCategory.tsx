import { Tab, Tabs } from "@heroui/react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";
import useMediaHandling from "@/hooks/useMediaHandling";

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
        <IconTab
          currentIcon={dataCategory?.icon}
          name={dataCategory?.name}
          isPendingUpdate={isPendingMutateUpdateCategory}
          onUpdate={handleUpdateCategory}
          isSuccessUpdateIcon={isSuccessMutateUpdateCategory}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          name={dataCategory?.name}
          isPendingUpdate={isPendingMutateUpdateCategory}
          onUpdate={handleUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
      {/* <Tab key="location" title="Location">
                Location
            </Tab> */}
    </Tabs>
  );
};

export default DetailCategory;
