import { call, put, takeLatest } from 'redux-saga/effects';
import {
  deleteImageRequest,
  deleteImageSuccess,
  deleteImageFailure,
} from '../slices/imageSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/utils/utils';


function* deleteImageSaga(action: PayloadAction<string>) {
  try {
    yield call(api.delete, "images", { params: { url: action.payload } });
    yield put(deleteImageSuccess());
  } catch (error:any) {
    yield put(deleteImageFailure(error.message));
  }
}

export default function* ImageSaga() {
  yield takeLatest(deleteImageRequest.type, deleteImageSaga);
}
