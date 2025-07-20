import instance from "@/libs/axios/instance";
import endpoint from "./endpointConstant";
import { IActivation, IRegister, ILogin } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) => 
    instance.post(`${endpoint.AUTH}/register`, payload),
  
  activation: (payload: IActivation) => 
    instance.post(`${endpoint.AUTH}/activation`, payload),

  login: (payload: ILogin) => 
    instance.post(`${endpoint.AUTH}/login`, payload),

  getProfileWithToken: (token: string) => 
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearee ${token}`,
      }
    })
};

export default authServices;