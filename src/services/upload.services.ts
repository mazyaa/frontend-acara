import instance from '@/libs/axios/instance';
import endpoint from '@/services/endpoint.constant';
import { IFileUrl } from '@/types/File';

const formDataHeader = { 
    headers: { // use header for knowing backend that we are sending form data
        "Content-Type": "multipart/form-data"
    }
}

const uploadServices = {
    uploadFile: (payload: FormData) => 
        instance.post(`${endpoint.MEDIA}/upload-single`, payload, formDataHeader),
    deleteFile: (payload: IFileUrl) =>
         instance.delete(`${endpoint.MEDIA}/remove`, { data: payload })
}

export default uploadServices;