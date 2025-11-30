import { Tab, Tabs } from "@heroui/react";

const DetailCategory = () => {
    return (
        <Tabs aria-label="Options">
            <Tab key="cover" title="Cover">
                Cover
            </Tab>
            <Tab key="info" title="Info">
                Info
            </Tab>
            <Tab key="location" title="Location">
                Location
            </Tab>
        </Tabs>
    )
}

export default DetailCategory;