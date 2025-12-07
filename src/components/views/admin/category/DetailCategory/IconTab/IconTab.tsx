import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  currentIcon: string;
  name: string;
}

const IconTab = (props: PropTypes) => {
    const {currentIcon, name} = props;
      return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1"> {/** use items start because default is center */} 
        <h1 className="font-bold text-xl">Category Icon</h1>
        <p className="text-sm text-default-400">Manage icon of this category</p>
      </CardHeader>

      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm text-default-700">Current Icon</p>
            <Skeleton isLoaded={!!currentIcon} className="aspect-square rounded-lg">
                <Image className="!relative" src={currentIcon} fill alt={name}/> 
            </Skeleton>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

export default IconTab;
