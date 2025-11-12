import { ToasterContext } from "@/context/ToasterContext";
import uploadServices from "@/services/upload.services";
import { useContext } from "react"

const useMediaHandling = () => {
    const { setToaster } = useContext(ToasterContext); // destructuring the setToaster function from ToasterContext
    const uploadFile = async (file: File, callback: (fileUrl: string) => void ) => {
        const formData = new FormData();
        formData.append("file", file);
        const {
            data: {
                data: {secure_url: icon},
            },
        } = await uploadServices.uploadFile(formData);

        callback(icon); //for getting the uploaded file url
    }

}