import { Tag} from "@/types/tag/tag";
import { api } from "../../../utils/utils";

export const TagApi = {
  fetchTags: ():Promise<Tag[]> => api.get<Tag[]>(`/tags`).then((response) => response.data),
  createTags: (tag:string):Promise<Tag> => api.post("/tags", tag),
  deleteTag: (id:string):Promise<void> => api.delete("/tags/" , {params: id} ).then((response) => response.data)
};
