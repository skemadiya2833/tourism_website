import { User } from "@/types/user/userPayload";
import { api } from "../../../utils/utils";

export const UserApi = {
  fetchUserById: (id: string):Promise<User> => api.get<User>(`/users/${id}`).then((response) => response.data),
};
