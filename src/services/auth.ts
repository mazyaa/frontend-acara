import instance from "@/libs/axios/instance";
import endpoint from "./endpointConstant";
import { IRegister } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
};

export default authServices;