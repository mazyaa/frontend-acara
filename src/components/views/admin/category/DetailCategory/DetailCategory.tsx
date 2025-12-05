import { Tab, Tabs } from "@heroui/react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";

const DetailCategory = () => {
    return (
        <Tabs aria-label="Options">
            <Tab key="cover" title="Cover">
                <IconTab />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab />
            </Tab>
            {/* <Tab key="location" title="Location">
                Location
            </Tab> */}
        </Tabs>
    )
}

export default DetailCategory;