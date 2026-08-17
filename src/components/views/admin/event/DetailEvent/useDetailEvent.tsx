import { ToasterContext } from "@/context/ToasterContext";
import eventServices from "@/services/event.services";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailEvent = () => {
  const { query, isReady } = useRouter(); // destructure query and isReady from useRouter for handling dynamic routes
  const { setToaster } = useContext(ToasterContext);

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(`${query.id}`);

    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    // use useQuery to fetch Event details
    queryKey: ["event"], // unique key for the query
    queryFn: getEventById, // fetch event by id from the query parameters
    enabled: isReady, // ensure the query runs only when the router is ready
  });

  // function for updating event info
  const updateEvent = async (payload: IEvent) => {
    const { data } = await eventServices.updateEvent(
        `${query.id}`,
        payload
    );
    return data.data;
  }

// setup mutate update event
  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: updateEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: (error as Error).message,
      });
    },
    onSuccess: () => {
      refetchEvent();

      setToaster({
        type: "success",
        message: "Successsfully updated event icon",
      });
    },
  });

  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  const handleUpdateInfo = (data: IEvent) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
    };
    mutateUpdateEvent(payload);
  }

  const handleUpdateLocation = (data: IEventForm) => {
    const payload = {
     ...data,
      location: {
        address: `${data.address}`,
        region: data.region ? `${data.region}` : "",
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
    };
    mutateUpdateEvent(payload);
  }

   const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } = useQuery({
    queryKey: ["defaultRegion"], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
    queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region), // fetch default region by id from the dataEvent location region
    enabled: !!dataEvent?.location?.region,
  });

  return {
    dataEvent,

    handleUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,

    dataDefaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailEvent;
