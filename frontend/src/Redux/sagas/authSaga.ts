import { call, put, takeEvery, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  refreshTokenSuccess,
  logout as logoutAction,
  refreshTokenFailure,
} from "../slices/authSlice";
import { registerPayload } from "@/types/auth/registerPayload";
import { loginPayload } from "@/types/auth/loginPayload";
import { api } from "@/utils/utils";
import { fetchUserByIdRequest } from "../slices/userSlice";
import { authPayload } from "@/types/auth/authPayload";
import { AuthApi } from "../api/auth/authApi";
import { setUserIdInCookie, removeUserIdFromCookie } from "@/utils/cookieUtils";

function* handleLogin(action: PayloadAction<loginPayload>) {
  try {
    const response: authPayload = yield call(AuthApi.login, action.payload);
    yield put(loginSuccess());
    if (response) {
      setUserIdInCookie(response.id);
    }
    yield put(fetchUserByIdRequest(response));
    yield call(setTokenRefreshInterval);
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message || "Login failed";
    yield put(loginFailure(errorMessage));
  }
}

function* handleRegister(action: PayloadAction<registerPayload>) {
  try {
    const response: authPayload = yield call(AuthApi.register, action.payload);
    yield put(registerSuccess());
    if (response) {
      setUserIdInCookie(response.id);
    }
    yield put(fetchUserByIdRequest(response));
    yield call(setTokenRefreshInterval);
  } catch (error: any) {
    const errorMessage: string =
      error.response?.data?.message || "Registration failed";
    yield put(registerFailure(errorMessage));
  }
}

function* handleRefreshToken(): Generator {
  try {
    yield call(api.post, "/auth/refresh-token");
    setTokenRefreshInterval();
    yield put(refreshTokenSuccess());
  } catch (error: any) {
    yield put(refreshTokenFailure);
  }
}
function* handleLogout() {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  console.log("access token: " + accessToken);

  if (accessToken || refreshToken) {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    removeUserIdFromCookie();
  } else {
    console.log("Cookies do not exist or are HttpOnly");
  }
}

function* setTokenRefreshInterval(): Generator {
  while (true) {
    yield delay(9 * 60 * 1000);
    yield call(handleRefreshToken);
  }
}
function* authSaga(): Generator {
  yield takeEvery("auth/loginStart", handleLogin);
  yield takeEvery("auth/registerStart", handleRegister);
  yield takeEvery("auth/refreshToken", handleRefreshToken);
  yield takeEvery("auth/logout", handleLogout);
}

export default authSaga;
