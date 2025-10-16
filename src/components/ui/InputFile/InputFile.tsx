import cn from "@/utils/cn";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropTypes {
  className?: string;
  isDropable?: boolean;
  name: string;
}

const InputFile = (props: PropTypes) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { className, isDropable, name } = props;
  const drop = useRef<HTMLLabelElement>(null); // for accesing the label element (drop zone area)
  const dropZoneId = useId();

  // for handling preventing default behavior of dragover and drop events 
  const handleDragOver = (e: DragEvent) => {
    if (isDropable) { // only allow drag over if isDropable is true
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadedImage(e.dataTransfer?.files[0] || null); // get the first file from the dropped files and set it to state
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
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedImage(files[0]);
    }
  };

  return (
    <label
      ref={drop} // reference to the label element for drag and drop events
      htmlFor={`dropzone-file-${dropZoneId}`}
      className={cn(
        "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200",
        className,
      )}
    >
      {uploadedImage ? ( // if there is an uploaded image, show the preview
        <div className="flex flex-col items-center justify-center p-5">
          <div className="mb-2 w-1/2">
            <Image
              fill
              src={URL.createObjectURL(uploadedImage)}
              alt="image"
              className="!relative"
            />
            <p className="text-center text-sm font-semibold text-gray-500 mt-3">
              {uploadedImage.name}
            </p>
          </div>
        </div>
      ) : ( // if no image is uploaded, show the drop zone message
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
  );
};

export default InputFile;
