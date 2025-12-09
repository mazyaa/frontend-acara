import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  currentIcon: string;
  name: string;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon, name } = props;
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Category Icon</h1>
        <p className="text-sm text-default-400">Manage icon of this category</p>
      </CardHeader>

      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image className="!relative" src={currentIcon} fill alt={name} />
            </Skeleton>


            <InputFile
              name="icon"
              isDropable={true}
              label={
                <p className="my-2 text-sm font-medium text-default-700">
                  Upload New Icon
                </p>
              }
              onUpload={() => {}}
              onDelete={() => {}}
            />

          <Button color="danger" className="my-4 disabled:bg-default-500">Save Changes</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
