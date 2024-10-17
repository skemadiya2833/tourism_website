import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
  softDeleteHeritageFailure
} from '../slices/heritageSlice';
import { HeritageApi } from '../api/heritage/heritageApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { PaginationRequest } from '@/types/common/pagination';
import { Heritage, HeritagesPayload } from '@/types/heritage/heritagePayload';

function* fetchHeritagesSaga(action: PayloadAction<PaginationRequest>) {
  try {
    const response:HeritagesPayload = yield call(HeritageApi.fetchHeritages, action.payload);
    yield put(fetchHeritagesSuccess(response));
  } catch (error:any) {
    yield put(fetchHeritagesFailure(error.message));
  }
}

function* fetchHeritageByIdSaga(
  action: PayloadAction<string>
) {
  try {
    console.log(" this is the heritage by id : ", action.payload)
    const response:Heritage = yield call(HeritageApi.fetchHeritageById, action.payload);
    console.log("t his iis result of heritage by id : ", response)
    yield put(fetchHeritageByIdSuccess(response));
  } catch (error: any) {
    yield put(fetchHeritageByIdFailure(error.message));
  }
}

function* createHeritageSaga(action: PayloadAction<FormData>) {
  try {
    yield call(HeritageApi.createHeritage, action.payload);
    yield put(createHeritageSuccess());
  } catch (error:any) {
    yield put(createHeritageFailure(error.message));
  }
}

function* updateHeritageSaga(action: PayloadAction<{id: string , data: FormData}>) {
  try {
    const response:Heritage = yield call(HeritageApi.updateHeritage, action.payload.id, action.payload.data);
    yield put(updateHeritageSuccess(response));
  } catch (error: any) {
    yield put(updateHeritageFailure(error.message));
  }
}

function* deleteHeritageSaga(action: PayloadAction<string>) {
  try {
    yield call(HeritageApi.softDeleteHeritage, action.payload);
    yield put(softDeleteHeritageSuccess());
  } catch (error: any) {
    yield put(softDeleteHeritageFailure(error.message));
  }
}

export default function* heritageSaga() {
  yield takeLatest(fetchHeritagesRequest.type, fetchHeritagesSaga);
  yield takeLatest(fetchHeritageByIdRequest.type, fetchHeritageByIdSaga);
  yield takeLatest(createHeritageRequest.type, createHeritageSaga);
  yield takeLatest(updateHeritageRequest.type, updateHeritageSaga);
  yield takeLatest(softDeleteHeritageRequest.type, deleteHeritageSaga);
}
