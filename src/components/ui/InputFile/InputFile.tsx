import cn from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
  className?: string;
  errorMessage?: string;
  isDropable?: boolean;
  isDeleting?: boolean;
  isInvalid?: boolean;
  isUploading?: boolean;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpload: (files: FileList) => void;
  onDelete: () => void;
  preview?: string;
}

const InputFile = (props: PropTypes) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const {
    className,
    errorMessage,
    isDropable,
    isDeleting,
    isUploading,
    name,
    onChange,
    onUpload,
    onDelete,
    isInvalid,
    preview,
  } = props;
  const drop = useRef<HTMLLabelElement>(null); // for accesing the label element (drop zone area)
  const dropZoneId = useId();

  // for handling preventing default behavior of dragover and drop events
  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      // only allow drag over if isDropable is true
      e.preventDefault();
      e.stopPropagation();
  }

  // get file via drag and drop zone
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && onUpload) {
      onUpload(files); // set files to function onUpload passed via props
    }
  };

  // add event listeners for dragover and drop events to the label element
  useEffect(() => {
    const dropCurrent = drop.current; // get the current label element
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      // remove event listeners if the component unmounts/isDropable changes
      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  // handle file input change event (for handling file selection via click)
  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files); // set files to function onUpload passed via props
    }
    }
  };

  return (
    <div>
      <label
        ref={drop} // reference to the label element for drag and drop events
        htmlFor={`dropzone-file-${dropZoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200",
          className,
          isInvalid && "border-danger-500", // add danger border if isInvalid uploadedImage is true
        )}
      >
    
        {preview && ( // render this component if preview image is available
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image
                fill
                src={preview} 
                alt="image"
                className="!relative"
              />
              <Button isIConOnly className="absolute right-2 top-2 h-9 w-9 items-center justify-center rounded bg-danger-100">
                {
                  isDeleting ? (
                    <Spinner size="sm" color="danger" />
                  ) : (
                    <CiTrash className="h-5 w-5 text-danger-500"/>
                  )
                }
              </Button>
            </div>
          </div>
        )}

        {preview && !isUploading && ( // render this component if preview image is not available and isUploading is false
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and drop or click to upload file here"
                : "Click to upload file here"}
            </p>
          </div>
        )}

        <input
          name={name}
          type="file"
          className="hidden"
          accept="iamge/*"
          onChange={handleOnChange}
          id={`dropzone-file-${dropZoneId}`}
        />
      </label>
      {isInvalid && (
        <p className="mt-1 text-sm text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
