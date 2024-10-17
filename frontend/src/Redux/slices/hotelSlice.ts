import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HotelsPayload, Hotel } from "@/types/hotel/hotelPayload";
import { HotelFetchQuery } from "@/types/hotel/hotelRequest";
import { PaginationRequest } from "@/types/common/pagination";

interface HotelState {
  hotels: HotelsPayload | null;
  pendingHotels: HotelsPayload | null;
  hotel: Hotel | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: HotelState = {
  hotels: null,
  pendingHotels: null,
  hotel: null,
  loading: false,
  error: null,
  success: false,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    fetchHotelsRequest: (state, action: PayloadAction<HotelFetchQuery>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchHotelsSuccess: (state, action: PayloadAction<HotelsPayload>) => {
      state.loading = false;
      state.hotels = action.payload;
      state.success = true;
    },
    fetchHotelsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    fetchPendingHotelsRequest: (
      state,
      action: PayloadAction<PaginationRequest>
    ) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchPendingHotelsSuccess: (
      state,
      action: PayloadAction<HotelsPayload>
    ) => {
      state.loading = false;
      state.pendingHotels = action.payload;
      state.success = true;
    },
    fetchPendingHotelsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    fetchHotelByIdRequest: (state, action: PayloadAction<string>) => {
      state.error = null;
      state.loading = true;
      state.success = false;
    },
    fetchHotelByIdSuccess: (state, action: PayloadAction<Hotel>) => {
      state.loading = false;
      state.hotel = action.payload;
      state.success = true;
    },
    fetchHotelByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    createHotelRequest: (state, action: PayloadAction<FormData>) => {
      state.loading = true;
      state.success = false;
    },
    createHotelSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createHotelFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    updateHotelRequest: (
      state,
      action: PayloadAction<{ data: FormData; id: string }>
    ) => {
      state.loading = true;
      state.success = false;
    },
    updateHotelSuccess: (state, action: PayloadAction<Hotel>) => {
      state.loading = false;
      if (state.hotels) {
        const index = state.hotels.data.findIndex(
          (hotel) => hotel.id === action.payload.id
        );
        if (index !== -1) {
          state.hotels.data[index] = action.payload;
        }
      }
      state.success = true;
    },
    updateHotelFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    updateHotelStatusRequest: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      state.loading = true;
      state.success = false;
    },
    updateHotelStatusSuccess: (state, action: PayloadAction<Hotel>) => {
      state.loading = false;
      if (state.hotels) {
        const index = state.hotels.data.findIndex(
          (hotel) => hotel.id === action.payload.id
        );
        if (index !== -1) {
          state.hotels.data[index].registrationStatus =
            action.payload.registrationStatus;
        }
      }
      state.success = true;
    },
    updateHotelStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    softDeleteHotelRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.success = false;
    },
    softDeleteHotelSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      if (state.hotels)
        state.hotels.data =
          state.hotels.data.filter((hotel) => hotel.id !== action.payload) ||
          null;
      state.success = true;
    },
    softDeleteHotelFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  fetchHotelsRequest,
  fetchHotelsSuccess,
  fetchHotelsFailure,
  fetchPendingHotelsRequest,
  fetchPendingHotelsSuccess,
  fetchPendingHotelsFailure,
  fetchHotelByIdRequest,
  fetchHotelByIdSuccess,
  fetchHotelByIdFailure,
  createHotelRequest,
  createHotelSuccess,
  createHotelFailure,
  updateHotelRequest,
  updateHotelSuccess,
  updateHotelFailure,
  updateHotelStatusRequest,
  updateHotelStatusSuccess,
  updateHotelStatusFailure,
  softDeleteHotelRequest,
  softDeleteHotelSuccess,
  softDeleteHotelFailure,
} = hotelSlice.actions;

export default hotelSlice.reducer;
