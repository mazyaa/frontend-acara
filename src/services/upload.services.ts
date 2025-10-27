import instance from '@/libs/axios/instance';
import endpoint from '@/services/endpoint.constant';

const formDataHeader = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}

const uploadServices = {
    uploadFile: (payload: FormData) => 
        instance.post(`${endpoint.MEDIA}/upload-single`, payload, formDataHeader)
}