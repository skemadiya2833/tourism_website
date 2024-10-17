import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user/userPayload";
import { authPayload } from "@/types/auth/authPayload";

interface UserState {
  user: User | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}
export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserByIdRequest(state, action: PayloadAction<authPayload>) {
      state.loading = true;
      state.error = null;
    },
    fetchUserByIdSucess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    fetchUserByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  fetchUserByIdRequest,
  fetchUserByIdSucess,
  fetchUserByIdFailure,
} = userSlice.actions;

export default userSlice.reducer;
