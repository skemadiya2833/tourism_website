import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ImageState = {
  loading: false,
  error: null,
  success: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    deleteImageRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteImageSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    deleteImageFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  deleteImageRequest,
  deleteImageSuccess,
  deleteImageFailure,
} = imageSlice.actions;

export default imageSlice.reducer;
