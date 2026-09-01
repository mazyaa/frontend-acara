import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import DetailEventTicket from "./DetailEventTicket";
import { ITicket } from "@/types/Ticket";
import DetailEventCart from "./DetailEventCart";

const DetailEvent = () => {
  const {
    dataDetailEvent,
    dataTicket,
    handleAddToCart,
    handleChangeQuantity,
    cart,
    dataTicketInCart,
  } = useDetailEvent();
  return (
    <div className="px-8 md:px-0">
      <Skeleton
        className="h-6 w-1/4 rounded-lg"
        isLoaded={!!dataDetailEvent?.name}
      >
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataDetailEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <Skeleton
            isLoaded={!!dataDetailEvent?.name}
            className="mb-2 h-12 w-1/2 rounded-lg"
          >
            <h1 className="mb-2 text-2xl font-semibold text-danger">
              {dataDetailEvent?.name}
            </h1>
          </Skeleton>

          <Skeleton
            className="mb-2 h-6 w-1/2 rounded-lg"
            isLoaded={
              !!dataDetailEvent?.startDate || !!dataDetailEvent?.endDate
            }
          >
            <div className="mb-2 flex items-center gap-2 text-foreground-500">
              <FaClock width={16} />
              <p>
                {convertTime(dataDetailEvent?.startDate)} -{" "}
                {convertTime(dataDetailEvent?.endDate)}
              </p>
            </div>
          </Skeleton>

          <Skeleton
            className="mb-2 h-6 w-1/2 rounded-lg"
            isLoaded={!!dataDetailEvent?.location}
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaLocationDot width={16} />
              <p>
                {dataDetailEvent?.isOnline ? "Online" : "Offline"}{" "}
                {dataDetailEvent?.isOnline
                  ? ""
                  : `- ${dataDetailEvent?.location?.address}`}
              </p>
            </div>
          </Skeleton>

          <Skeleton
            className="mb-4 aspect-video w-full rounded-lg"
            isLoaded={!!dataDetailEvent?.banner}
          >
            <Image
              alt="cover"
              src={dataDetailEvent?.banner || "/images/ilustration/no-data.svg"}
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>

          <Tabs aria-label="Tabs with different styles" fullWidth>
            <Tab key="Description" title="Description">
              <h2 className="text-xl font-semibold text-foreground-700">
                About Event
              </h2>
              <Skeleton
                className="mt-2 h-32 w-full rounded-lg"
                isLoaded={!!dataDetailEvent?.description}
              >
                <p className="text-foreground-500">
                  {dataDetailEvent?.description}
                </p>
              </Skeleton>
            </Tab>

            <Tab key="Ticket" title="Ticket">
              <h2 className="text-xl font-semibold text-foreground-700">
                Ticket
              </h2>
              <div className="mt-2 flex flex-col gap-8">
                {dataTicket?.map((ticket: ITicket) => (
                  <DetailEventTicket
                    key={`ticket-${ticket._id}`}
                    ticket={ticket}
                    cart={cart}
                    handleAddToCart={() =>
                      handleAddToCart(`${ticket._id}` || "")
                    }
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/6">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;
