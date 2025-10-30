import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Please input name'),
    description: yup.string().required('Please input description'),
    icon: yup.mixed<FileList>().required('Please upload an icon'),
})