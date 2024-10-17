import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag, TagsResponse } from "@/types/tag/tag";

interface TagState {
  tags: Tag[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  tags: null,
  loading: false,
  error: null,
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    fetchTagsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTagsSuccess(state, action: PayloadAction<TagsResponse>) {
      state.tags = action.payload.data;
      state.loading = false;
    },
    fetchTagsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createTagRequest(state, action: PayloadAction<{ name: string }>) {
      state.loading = true;
      state.error = null;
    },
    createTagSuccess(state) {
      state.loading = false;
    },
    createTagFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTagRequest(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    deleteTagSuccess(state) {
      state.loading = false;
    },
    deleteTagFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
  createTagRequest,
  createTagSuccess,
  createTagFailure,
  deleteTagRequest,
  deleteTagSuccess,
  deleteTagFailure,
} = tagSlice.actions;

export default tagSlice.reducer;
