import { ToasterContext } from "@/context/ToasterContext";
import categoryServices from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    return res;
  };

  const {
    mutate: mutateDeleteCategory, // set alias for mutate function
    isPending: isPendingDeleteCategory, // set alias for isPending
    isSuccess: isSuccessDeleteCategory, // set alias for isSuccess 
  } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Category deleted successfyully!",
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
    mutateDeleteCategory,
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
  };
};
