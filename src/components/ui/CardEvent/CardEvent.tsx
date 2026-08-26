import { IEvent } from "@/types/Event";
import {  convertTime } from "@/utils/date";
import { Card, CardBody, CardFooter, cn, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface PropTypes {
  className?: string;
  event?: IEvent;
  isLoading?: boolean;
  key?: string;
}

const CardEvent = (props: PropTypes) => {
  const { className, event, isLoading, key } = props;
  return (
    <Card
      shadow="sm"
      isPressable // make the card pressable
      as={Link}
      href={`/event/${event?.slug}`} 
      key={key}
      className={cn(className, "cursor-pointer")}
    >
      {!isLoading ? (
        <Fragment>
            <CardBody>
        <Image
          alt="cover"
          src={`${event?.banner}` || "/images/default-banner.jpg"}
          width={1920}
          height={1080}
          className="aspect-video rounded-lg object-cover"
        />
      </CardBody>

      <CardFooter className="flex-col pt-0 items-start flex ">
        <h2 className="line-clamp-1 text-lg font-bold text-danger w-full">
          {event?.name}
        </h2>
        <p className="mb-2 line-clamp-2 text-sm">{event?.description}</p>
        <p className="text-foreground-500 text-sm">{convertTime(`${event?.startDate}`)}</p>
      </CardFooter>
        </Fragment>
      ): (
        <Fragment>
           <CardBody>
             <Skeleton className="roundedlg aspect-video w-full bg-default-400" />
           </CardBody>

           <CardFooter className="flex flex-col items-start gap-2 pt-0">
             <Skeleton className="h-4 w-3/5 rounded-lg bg-default-400" />
             <Skeleton className="h-4 w-4/5 rounded-lg bg-default-400" />
             <Skeleton className="h-4 w-2/5 rounded-lg bg-default-400" />
           </CardFooter>

        </Fragment>
      )}
    </Card>
  );
};

export default CardEvent;
