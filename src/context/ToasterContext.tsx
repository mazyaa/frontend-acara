import { useContext, useState } from "react";

interface IToaster {
  toaster: {
    type: string;
    message: string;
  };
  setToaster: (toaster: { type: string; message: string }) => void;
}

const ToasterContext = useContext<IToaster>({
    toaster: {
        type: "",
        message: ""
    },
    setToaster: () => {},
});


