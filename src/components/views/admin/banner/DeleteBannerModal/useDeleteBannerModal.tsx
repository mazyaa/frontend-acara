import { ToasterContext } from "@/context/ToasterContext";
import bannerServices from "@/services/banner.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useDeleteBannerModal = () => {
  const { setToaster } = useContext(ToasterContext); 

  const deleteBanner = async (id: string) => {
    const res = await bannerServices.deleteBanner(id);
    return res;
  };

  const {
    mutate: mutateDeleteBanner, // set alias for mutate function
    isPending: isPendingMutateDeleteBanner, // set alias for isPending
    isSuccess: isSuccessDeleteBanner, // set alias for isSuccess 
  } = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Banner deleted successfully!",
      });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
  });

  return {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessDeleteBanner,
  };
};
