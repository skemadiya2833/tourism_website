import { authPayload } from "@/types/auth/authPayload";
import { api } from "../../../utils/utils";
import { loginPayload } from "@/types/auth/loginPayload";
import { registerPayload } from "@/types/auth/registerPayload";

export const AuthApi = {
  login: (data: loginPayload): Promise<authPayload> => api.post<authPayload>("/auth/login",data ).then((response) => response.data),
  register: (data: registerPayload) => api.post("/auth/register",data ).then((response) => response.data),
};
