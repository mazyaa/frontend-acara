import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string().required("Please input category"),
  isFeatured: yup.string().required("Please select featured"),
  isOnline: yup.string().required("Please select online or offline"),
});

const useEventFilter = () => {
  const {
    control, // use for controlling handling value form
    reset, // use for reset form
    watch, // use for watching value form (like onChange)
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema), // resolver validation by yup schema
  });

  const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
    queryKey: ["Categories"], // for caching data, so if the queryKey is the same it will return the cached data, but if the queryKey is different it will fetch new data
    queryFn: () => categoryServices.getCategories(),
  });

  return {
    control,
    setValue,
    dataCategory,
    isSuccessGetCategory,
  };
};

export default useEventFilter;
