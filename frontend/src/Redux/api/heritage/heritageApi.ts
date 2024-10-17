import { HeritageResponse } from "@/types/search/searchPayload";
import { api } from "../../../utils/utils";
import { PaginationRequest } from "@/types/common/pagination";
import { Heritage, HeritagesPayload } from "@/types/heritage/heritagePayload";

export const HeritageApi = {
  fetchHeritages: (query: PaginationRequest):Promise<HeritagesPayload> => api.get("/heritages", { params: query }).then((response) => response.data),
  fetchHeritageById: (id: string):Promise<Heritage> => api.get(`/heritages/${id}`).then((response) => response.data),
  createHeritage: (data: FormData) =>
    api.post("/heritages", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateHeritage: (id: string, data: FormData) =>
    api.patch(`/heritages/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  softDeleteHeritage: (id: string) => api.delete(`/heritages/${id}`),
};
