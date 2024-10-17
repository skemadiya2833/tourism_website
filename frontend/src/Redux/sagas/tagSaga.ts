import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
  createTagRequest,
  createTagSuccess,
  createTagFailure,
  deleteTagRequest,
  deleteTagSuccess,
  deleteTagFailure,
} from '../slices/tagSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { TagApi } from '../api/tag/tagApi';
import { Tag, TagsResponse } from '@/types/tag/tag';


function* fetchTagsSaga() {
  try {
      console.log(" fetching tags details with id and name ......................................")
    const response:TagsResponse = yield call(TagApi.fetchTags);
    console.warn(" this is the response from fetch tags saga : ", response)  //  print the fetched tags details  //
    yield put(fetchTagsSuccess(response));
  } catch (error:any) {
    yield put(fetchTagsFailure(error.message));
  }
}

function* createTagSaga(action: PayloadAction< string >) {
  try {
    yield call(TagApi.createTags, action.payload)
    yield put(createTagSuccess());
  } catch (error:any) {
    yield put(createTagFailure(error.message));
  }
}


function* deleteTagSaga(action: PayloadAction<string>) {
  try {
    yield call(TagApi.deleteTag, action.payload);
    yield put(deleteTagSuccess());
  } catch (error:any) {
    yield put(deleteTagFailure(error.message));
  }
}

export default function* tagSaga() {
  yield takeLatest(fetchTagsRequest.type, fetchTagsSaga);
  yield takeLatest(createTagRequest.type, createTagSaga);
  yield takeLatest(deleteTagRequest.type, deleteTagSaga);
}
