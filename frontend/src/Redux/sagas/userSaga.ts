import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUserByIdFailure,
  fetchUserByIdRequest,
  fetchUserByIdSucess,
} from "../slices/userSlice"

import { PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from '../api/user/userApi';
import { User } from '@/types/user/userPayload';
import { authPayload } from '@/types/auth/authPayload';

function* fetchUserByIdSaga(action: PayloadAction< authPayload>) {
  try {
    const response:User = yield call(UserApi.fetchUserById, action.payload.id);
    yield put(fetchUserByIdSucess(response));
  } catch (error:any) {
    yield put(fetchUserByIdFailure(error.message));
  }
}

export function* userSaga(): Generator {
    yield takeLatest(fetchUserByIdRequest.type, fetchUserByIdSaga);
}