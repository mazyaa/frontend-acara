import { ToasterContext } from "@/context/ToasterContext";
import uploadServices from "@/services/upload.services";
import { IFileUrl } from "@/types/File";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useMediaHandling = () => {
  const { setToaster } = useContext(ToasterContext); // destructuring the setToaster function from ToasterContext

  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: {
        data: { secure_url: fileUrl },
      },
    } = await uploadServices.uploadFile(formData);

    callback(fileUrl); //for getting the uploaded file url
  };

  // setup mutetae upload file
  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        // must be destructured like this because function uploadFile have 2 parameters
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: (error as Error).message,
        });
      },
    });

  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const response = await uploadServices.deleteFile({ fileUrl });
    if (response.data.meta.status === 200) {
      callback();
    }
  };

  // setup mutate delete file
  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: {
        // must be destructured like thise because function uploadFile have 2 parameters
        fileUrl: string;
        callback: () => void;
      }) => deleteFile(variables.fileUrl, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: (error as Error).message,
        });
      },
    });

  //create handle upload icon
  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrl: string) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files); // set value to form as a FileList
      mutateUploadFile({
        file: files[0], // upload first file only
        callback: callback, // after upload success set value form type as a string (url)
      });
    }
  };

  // create handle delete icon
  const handleDeleteFile = (
    fileUrl: string | FileList | undefined,
    callback: () => void,
  ) => {
    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback,
      });
    } else {
      callback(); // if fileUrl is not a string, just call the callback without deleting
    }
  };

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMediaHandling;
