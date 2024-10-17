import { HotelFetchQuery, HotelRequest } from "@/types/hotel/hotelRequest";
import { api } from "../../../utils/utils";
import { PaginationRequest } from "@/types/common/pagination";
import { RegistrationStatus } from "@/types/enum/registrationStatus.enum";
import { Hotel, HotelsPayload } from '@/types/hotel/hotelPayload';

export const HotelApi = {
  fetchHotels: (query: HotelFetchQuery):Promise<HotelsPayload> => api.get<HotelsPayload>("/hotels", { params: query }).then((response) => response.data),
  fetchPendingHotels: (query: PaginationRequest):Promise<HotelsPayload> => api.get<HotelsPayload>("/hotels/pending", { params: query }).then((response) => response.data),
  fetchHotel: (id: string):Promise<Hotel> => api.get<Hotel>(`/hotels/${id}`).then((response) => response.data),
  createHotel: (data: FormData) =>
    api.post("/hotels", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateHotel: (id: string, data: FormData):Promise<Hotel> =>
    api.patch<Hotel>(`/hotels/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => response.data),
  updateHotelStatus: (id: string, status: RegistrationStatus):Promise<Hotel> => api.patch<Hotel>(`/hotels/status/${id}`, { status }).then((response) => response.data),
  softDeleteHotel: (id: string) => api.delete(`/hotels/${id}`),
};
