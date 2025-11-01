import categoryServices from '@/services/category.service';
import uploadServices from '@/services/upload.services';
import { ICategory, ICategoryForm } from '@/types/Category';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Please input name'),
    description: yup.string().required('Please input description'),
    icon: yup.mixed<FileList>().required('Please upload an icon'),
});

const useAddCategoryModel = () => {

    // create control form
    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    //for handling upload icon
    const uploadIcon = async (data: ICategoryForm) => {
        const formData = new FormData();
        formData.append('file', data.icon[0]);

        const {
            data: { secure_url: icon },
        } = await uploadServices.uploadFile(formData);

        return {
            name: data.name,
            description: data.description,
            icon,
        }
    }

    // for adding new category
    const addCategory = async (payload: ICategory) => {
        const response = await categoryServices.addCategory(payload);
        return response;
    };
};