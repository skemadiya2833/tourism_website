import { PlaceRequest } from "@/types/place/placeRequest";
import { api } from "../../../utils/utils";
import { PaginationRequest } from "@/types/common/pagination";
import { Name, Place, PlaceNamePayload, PlacesPayload } from "@/types/place/placePayload";

export const PlaceApi = {
  fetchPlace: (query: PaginationRequest): Promise<PlacesPayload> => api.get<PlacesPayload>("/places", { params: query }).then((response) => response.data),
  fetchPlaceName: (query: PlaceRequest): Promise<Name[]> => api.get<Name[]>("/places", { params: query }).then((response) => response.data),
  fetchPlaceById: (id: string): Promise<Place> => api.get<Place>(`/places/${id}`).then((response) => response.data),
  createPlace: (data: FormData) =>
    api.post("/places", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updatePlace: (id: string, data: FormData) =>
    api.patch(`/places/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  softDeletePlace: (id: string) => api.delete(`/heritages/${id}`),
};
