import { ReactNode } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const iconLIst: { [key: string]: ReactNode} = {
    success: <CiCircleCheck className="text-3xl text-success-55" />,
    error: <CiCircleRemove className="text-3xl text-danger-55" />,
}

interface PropTypes {
    type: string;
    message: string;
}

const Toaster = (props: PropTypes) => {
  const { type, message } = props;
  return (
    <div
      role="alert"
      arial-label="toaster-label"
      className="rouded-xl fixed rounded-lg right-8 top-8 max-w-xs border border-gray-200 bg-white shadow-md"
    >
        <div className="flex items-center gap-2 p-4">
            {iconLIst[type]}
            <p id="toaster-label" className="text-sm text-gray-700">
                {message}
            </p>
        </div>
    </div>
  );
};


export default Toaster;