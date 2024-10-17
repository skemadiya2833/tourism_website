import { all } from "redux-saga/effects";
import authSaga from "./sagas/authSaga";
import searchSaga from "./sagas/searchSaga";
import { hotelSaga } from "./sagas/hotelSaga";
import heritageSaga from "./sagas/heritageSaga";
import { placeSaga } from "./sagas/placeSaga";
import { userSaga } from "./sagas/userSaga";
import tagSaga from "./sagas/tagSaga";
import imageSaga from "./sagas/imageSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    searchSaga(),
    hotelSaga(),
    heritageSaga(),
    placeSaga(),
    userSaga(),
    tagSaga(),
    imageSaga()
  ]);
}
