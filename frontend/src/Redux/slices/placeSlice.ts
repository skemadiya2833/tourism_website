import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacesPayload, Place, Name } from '@/types/place/placePayload';
import { PlaceRequest} from '@/types/place/placeRequest';
interface PlaceState {
  places: PlacesPayload | null;
  place: Place | null;
  name: Name[] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PlaceState = {
  places: null,
  place: null,
  name: null,
  loading: false,
  error: null,
  success: false,
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    fetchPlacesRequest(state, action:PayloadAction<{page?:number, limit?:number , keyword?:string}>) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchPlacesSuccess(state, action: PayloadAction<PlacesPayload>) {
      state.loading = false;
      state.places = action.payload;
      state.success = true;
    },
    fetchPlacesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    fetchPlaceByIdRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchPlaceByIdSuccess(state, action: PayloadAction<Place>) {
      state.loading = false;
      state.place = action.payload;
      state.success = true;
    },
    fetchPlaceByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    fetchPlaceNameRequest(state, action: PayloadAction<PlaceRequest>) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchPlaceNameSuccess(state, action: PayloadAction<Name[]>) {
      state.loading = false;
      state.name = action.payload;
      state.success = true;
    },
    fetchPlaceNameFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    createPlaceRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createPlaceSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    createPlaceFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    updatePlaceRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updatePlaceSuccess(state, action: PayloadAction<Place>) {
      state.loading = false;
      state.loading = false;
      if(state.places) {
        const index = state.places.data.findIndex(place => place.id === action.payload.id);
        if (index !== -1) {
          state.places.data[index] = action.payload;
        }
      }
      state.success = true;
    },
    updatePlaceFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    deletePlaceRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    deletePlaceSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    deletePlaceFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  fetchPlacesRequest,
  fetchPlacesSuccess,
  fetchPlacesFailure,
  fetchPlaceByIdRequest,
  fetchPlaceByIdSuccess,
  fetchPlaceByIdFailure,
  fetchPlaceNameRequest,
  fetchPlaceNameSuccess,
  fetchPlaceNameFailure,
  createPlaceRequest,
  createPlaceSuccess,
  createPlaceFailure,
  updatePlaceRequest,
  updatePlaceSuccess,
  updatePlaceFailure,
  deletePlaceRequest,
  deletePlaceSuccess,
  deletePlaceFailure,
} = placeSlice.actions;

export default placeSlice.reducer;
