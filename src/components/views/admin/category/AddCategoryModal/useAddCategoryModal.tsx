import categoryServices from '@/services/category.service';
import uploadServices from '@/services/upload.services';
import { ICategory } from '@/types/Category';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Please input name'),
    description: yup.string().required('Please input description'),
    icon: yup.mixed<FileList>().required('Please upload an icon'),
});

const useAddCategoryModel = () => {
    const uploadFile = async (payload: FormData) => {
        const { data } = await uploadServices.uploadFile(payload);

        return data;
    };

    const addCategory = async (payload: ICategory) => {
        const response = await categoryServices.addCategory(payload);

        return response;
    };

    // create control form
    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
};