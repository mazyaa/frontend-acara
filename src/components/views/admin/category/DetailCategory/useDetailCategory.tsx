import { ToasterContext } from "@/context/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";



const useDetailCategory = () => {
  const { query, isReady } = useRouter(); // destructure query and isReady from useRouter for handling dynamic routes
  const { setToaster } = useContext(ToasterContext);

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);

    return data.data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    // use useQuery to fetch category details
    queryKey: ["category"], // unique key for the query
    queryFn: () => getCategoryById(`${query.id}`), // fetch category by id from the query parameters
    enabled: isReady, // ensure the query runs only when the router is ready
  });

  // function for updating category info
  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryServices.updateCategory(
        `${query.id}`,
        payload
    );
    return data.data;
  }

// setup mutate update category
  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingMutateUpdateCategory,
    isSuccess: isSuccessMutateUpdateCategory,
  } = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: (error as Error).message,
      });
    },
    onSuccess: () => {
      refetchCategory();

      setToaster({
        type: "success",
        message: "Successsfully updated category icon",
      });
    },
  });

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);


  return {
    dataCategory,

    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  };
};

export default useDetailCategory;
