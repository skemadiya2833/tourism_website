import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Heritage, HeritagesPayload } from '@/types/heritage/heritagePayload';

interface HeritageState {
  heritages: HeritagesPayload | null;
  heritage: Heritage | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: HeritageState = {
  heritages: null,
  heritage: null,
  loading: false,
  error: null,
  success: false,
};

const heritageSlice = createSlice({
  name: 'heritage',
  initialState,
  reducers: {
    fetchHeritagesRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchHeritagesSuccess(state, action: PayloadAction<HeritagesPayload>) {
      state.loading = false;
      state.heritages = action.payload;
      state.success = true;
    },
    fetchHeritagesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    fetchHeritageByIdRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchHeritageByIdSuccess(state, action: PayloadAction<Heritage>) {
      state.loading = false;
      state.heritage = action.payload;
      state.success = true;
    },
    fetchHeritageByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    createHeritageRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createHeritageSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    createHeritageFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    updateHeritageRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateHeritageSuccess(state, action: PayloadAction<Heritage>) {
      state.loading = false;
      if(state.heritages) {
        const index = state.heritages.data.findIndex(heritage => heritage.id === action.payload.id);
        if(index !== -1) {
          state.heritages.data[index] = action.payload;
        }
      }
      state.success = true;
    },
    updateHeritageFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    softDeleteHeritageRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    softDeleteHeritageSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    softDeleteHeritageFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  fetchHeritagesRequest,
  fetchHeritagesSuccess,
  fetchHeritagesFailure,
  fetchHeritageByIdRequest,
  fetchHeritageByIdSuccess,
  fetchHeritageByIdFailure,
  createHeritageRequest,
  createHeritageSuccess,
  createHeritageFailure,
  updateHeritageRequest,
  updateHeritageSuccess,
  updateHeritageFailure,
  softDeleteHeritageRequest,
  softDeleteHeritageSuccess,
  softDeleteHeritageFailure,
} = heritageSlice.actions;

export default heritageSlice.reducer;
