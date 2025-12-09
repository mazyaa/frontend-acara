import { ICategory } from "@/types/Category";
import { Button, Card, CardBody, CardHeader, Input, Skeleton, Textarea } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  dataCategory: ICategory;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory } = props;
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        {/** use items start because default is center */}
        <h1 className="text-xl font-bold">Category Information</h1>
        <p className="text-sm text-default-400">
          Manage information of this category
        </p>
      </CardHeader>

      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Information</p>
            <Skeleton
              isLoaded={!!dataCategory?.name}
              className="rounded-sm"
            >
              <Textarea
                className="rounded"
                variant="bordered"
                label="Name"
                defaultValue={dataCategory?.name}
              />
            </Skeleton>

            <Skeleton
              isLoaded={!!dataCategory?.description}
              className="rounded-sm"
            >
              <Textarea
                className="rounded"
                variant="bordered"
                label="Description"
                defaultValue={dataCategory?.description}
              />
            </Skeleton>

            <Button color="danger" className="my-4 disabled:bg-default-500">
              Save Changes
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
