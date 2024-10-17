import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from "../slices/hotelSlice"
import { HotelApi } from '../api/hotel/hotelApi';
import { Hotel, HotelsPayload } from '@/types/hotel/hotelPayload';
import { PayloadAction } from '@reduxjs/toolkit';
import { PaginationRequest } from '@/types/common/pagination';
import { HotelFetchQuery, UpdateHotelStatus } from '@/types/hotel/hotelRequest';

function* fetchHotelsSaga(action: PayloadAction<HotelFetchQuery>) {
  try {
    const response:HotelsPayload = yield call(HotelApi.fetchHotels, action.payload);
    yield put(fetchHotelsSuccess(response));
  } catch (error:any) {
    yield put(fetchHotelsFailure(error.message));
  }
}

function* fetchPendingHotelsSaga(action: PayloadAction<PaginationRequest>) {
  try {
    const response:HotelsPayload = yield call(HotelApi.fetchPendingHotels,action.payload);
    yield put(fetchPendingHotelsSuccess(response));
  } catch (error:any) {
    yield put(fetchPendingHotelsFailure(error.message));
  }
}

function* fetchHotelByIdSaga(action: PayloadAction<string>) {
  try {
    const response:Hotel = yield call(HotelApi.fetchHotel, action.payload);
    yield put(fetchHotelByIdSuccess(response));
  } catch (error:any) {
    yield put(fetchHotelByIdFailure(error.message));
  }
}

function* createHotelSaga(action: PayloadAction<FormData>) {
  try {
    yield call(HotelApi.createHotel, action.payload);
    yield put(createHotelSuccess());
  } catch (error:any) {
    yield put(createHotelFailure(error.message));
  }
}

function* updateHotelSaga(action:PayloadAction<{data: FormData, id: string}>) {
  try {
    const response:Hotel = yield call(HotelApi.updateHotel, action.payload.id , action.payload.data);
    yield put(updateHotelSuccess(response));
  } catch (error:any) {
    yield put(updateHotelFailure(error.message));
  }
}

function* updateHotelStatusSaga(action: PayloadAction<UpdateHotelStatus>) {
  try {
    const { id, status } = action.payload;
    const response:Hotel = yield call(HotelApi.updateHotelStatus, id, status);
    yield put(updateHotelStatusSuccess(response));
  } catch (error:any) {
    yield put(updateHotelStatusFailure(error.message));
  }
}

function* softDeleteHotelSaga(action: PayloadAction<string>) {
  try {
    yield call(HotelApi.softDeleteHotel, action.payload);
    yield put(softDeleteHotelSuccess(action.payload));
  } catch (error:any) {
    yield put(softDeleteHotelFailure(error.message));
  }
}

export function* hotelSaga(): Generator {
    yield takeLatest(fetchHotelsRequest.type, fetchHotelsSaga);
    yield takeLatest(fetchHotelByIdRequest.type, fetchHotelByIdSaga);
    yield takeLatest(createHotelRequest.type, createHotelSaga);
    yield takeLatest(updateHotelRequest.type, updateHotelSaga);
    yield takeLatest(updateHotelStatusRequest.type, updateHotelStatusSaga);
    yield takeLatest(fetchPendingHotelsRequest.type, fetchPendingHotelsSaga);
    yield takeLatest(softDeleteHotelRequest.type, softDeleteHotelSaga);
}