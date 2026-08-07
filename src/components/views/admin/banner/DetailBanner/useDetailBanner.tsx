import { ToasterContext } from "@/context/ToasterContext";
import bannerServices from "@/services/banner.services";
import { IBanner } from "@/types/Banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";



const useDetailBanner = () => {
  const { query, isReady } = useRouter(); // destructure query and isReady from useRouter for handling dynamic routes
  const { setToaster } = useContext(ToasterContext);

  const getBannerById = async () => {
    const { data } = await bannerServices.getBannerById(`${query.id}`);

    return data.data;
  };

  const { data: dataBanner, refetch: refetchBanner } = useQuery({
    // use useQuery to fetch Banner details
    queryKey: ["banner"], // unique key for the query
    queryFn: () => getBannerById(), // fetch banner by id from the query parameters
    enabled: isReady, // ensure the query runs only when the router is ready
  });

  // function for updating banner info
  const updateBanner = async (payload: IBanner) => {
    const { data } = await bannerServices.updateBanner(
        `${query.id}`,
        payload
    );
    return data.data;
  }

// setup mutate update banner
  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingMutateUpdateBanner,
    isSuccess: isSuccessMutateUpdateBanner,
  } = useMutation({
    mutationFn: updateBanner,
    onError: (error) => {
      setToaster({
        type: "error",
        message: (error as Error).message,
      });
    },
    onSuccess: () => {
      refetchBanner();

      setToaster({
        type: "success",
        message: "Successsfully updated banner icon",
      });
    },
  });

  const handleUpdateBanner = (data: IBanner) => mutateUpdateBanner(data);


  return {
    dataBanner,

    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  };
};

export default useDetailBanner;
