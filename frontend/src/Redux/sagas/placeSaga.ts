import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPlacesRequest,
  fetchPlacesSuccess,
  fetchPlacesFailure,
  fetchPlaceByIdRequest,
  fetchPlaceByIdSuccess,
  fetchPlaceByIdFailure,
  fetchPlaceNameRequest,
  createPlaceRequest,
  createPlaceSuccess,
  createPlaceFailure,
  updatePlaceRequest,
  updatePlaceSuccess,
  updatePlaceFailure,
  deletePlaceRequest,
  deletePlaceSuccess,
  deletePlaceFailure,
  fetchPlaceNameSuccess,
} from '../slices/placeSlice';
import { PaginationRequest } from '@/types/common/pagination';
import { PlaceRequest } from '@/types/place/placeRequest';
import { PayloadAction } from '@reduxjs/toolkit';
import { PlaceApi } from '../api/place/placeApi';
import { Name, Place, PlacesPayload } from '@/types/place/placePayload';

function* fetchPlacesSaga(action: PayloadAction<{page?:number, limit?:number, keyword?:string}>) {
  try {
    const response:PlacesPayload = yield call(PlaceApi.fetchPlace, action.payload);
    yield put(fetchPlacesSuccess(response));
  } catch (error:any) {
    yield put(fetchPlacesFailure(error.message));
  }
}
// Worker Sagas
function* fetchPlaceNameSaga(action: PayloadAction<PlaceRequest>) {
  try {
    console.log( " this is fecthplace action payload" , action.payload)
    const response: Name[] = yield call(PlaceApi.fetchPlaceName,action.payload);
    console.log("Response from saga is:", response);
    yield put(fetchPlaceNameSuccess(response));
  } catch (error:any) {
    yield put(fetchPlacesFailure(error.message));
  }
}

function* fetchPlaceByIdSaga(action: PayloadAction<string>) {
  try {
    console.log(" this is place id saga " , action.payload)
    const response:Place = yield call(PlaceApi.fetchPlaceById, action.payload);
    yield put(fetchPlaceByIdSuccess(response));
  } catch (error:any) {
    yield put(fetchPlaceByIdFailure(error.message));
  }
}

function* createPlaceSaga(action: PayloadAction<FormData>) {
  try {
    yield call(PlaceApi.createPlace, action.payload);
    yield put(createPlaceSuccess());
  } catch (error:any) {
    yield put(createPlaceFailure(error.message));
  }
}

function* updatePlaceSaga(action: PayloadAction<{ id: string; data: FormData }>) {
  try {
    const { id, data } = action.payload
    const response: Place = yield call(PlaceApi.updatePlace,id,data, );
    yield put(updatePlaceSuccess(response));
  } catch (error:any) {
    yield put(updatePlaceFailure(error.message));
  }
}

function* deletePlaceSaga(action: PayloadAction<string>) {
  try {
    yield call(PlaceApi.softDeletePlace, action.payload);
    yield put(deletePlaceSuccess());
  } catch (error:any) {
    yield put(deletePlaceFailure(error.message));
  }
}

// Watcher Sagas
export function* placeSaga() {
  yield takeLatest(fetchPlacesRequest.type, fetchPlacesSaga);
  yield takeLatest(fetchPlaceNameRequest.type, fetchPlaceNameSaga);
  yield takeLatest(fetchPlaceByIdRequest.type, fetchPlaceByIdSaga);
  yield takeLatest(createPlaceRequest.type, createPlaceSaga);
  yield takeLatest(updatePlaceRequest.type, updatePlaceSaga);
  yield takeLatest(deletePlaceRequest.type, deletePlaceSaga);
}
























// // import { call, put, takeLatest } from "redux-saga/effects";
// // import axios from "axios";
// // import {
// //   fetchAllPlacesStart,
// //   fetchAllPlacesSuccess,
// //   fetchAllPlacesFailure,
// //   fetchPlaceStart,
// //   fetchPlaceSuccess,
// //   fetchPlaceFailure,
// // } from "../slices/placeSlice";
// // import {
// //   GetAllPlacesWithImagesResponse,
// //   GetPlaceWithImagesResponse,
// //   PlaceWithImages,
// // } from "../../types/place/placesApiResponse";

// // const api = axios.create({
// //   baseURL: "http://localhost:5001/",
// //   withCredentials: true,
// // });

// // function* fetchAllPlacesSaga() {
// //   try {
// //     const response: PlaceWithImages = yield call(api.get, "places");
// //     yield put(fetchAllPlacesSuccess(response));
// //   } catch (error: any) {
// //     yield put(fetchAllPlacesFailure("Failed to fetch places with images"));
// //   }
// // }

// // function* fetchPlaceSaga(action: ReturnType<typeof fetchPlaceStart>) {
// //   try {
// //     const response: GetPlaceWithImagesResponse = yield call(
// //       api.get,
// //       `/places/${action.payload}`
// //     );
// //     yield put(fetchPlaceSuccess(response));
// //   } catch (error: any) {
// //     yield put(fetchPlaceFailure("Failed to fetch place with images"));
// //   }
// // }

// // export function* placeSaga() {
// //   yield takeLatest(fetchAllPlacesStart.type, fetchAllPlacesSaga);
// //   yield takeLatest(fetchPlaceStart.type, fetchPlaceSaga);
// // }


// // src/store/sagas/placeSaga.ts
// import { call, put, takeLatest } from 'redux-saga/effects';
// import {
//   fetchPlacesRequest,
//   fetchPlacesSuccess,
//   fetchPlacesFailure,
//   fetchPlaceByIdRequest,
//   fetchPlaceByIdSuccess,
//   fetchPlaceByIdFailure,
//   createPlaceRequest,
//   createPlaceSuccess,
//   createPlaceFailure,
//   updatePlaceRequest,
//   updatePlaceSuccess,
//   updatePlaceFailure,
//   deletePlaceRequest,
//   deletePlaceSuccess,
//   deletePlaceFailure,
// } from '../slices/placeSlice';
// import { fetchPlaces, fetchPlaceById, createPlace, updatePlace, deletePlace } from '@/services/placeService';
// import { PayloadAction } from '@reduxjs/toolkit';

// function* fetchPlacesSaga(action: PayloadAction<string>) {
//   try {
//     const data = yield call(fetchPlaces, action.payload);
//     yield put(fetchPlacesSuccess(data));
//   } catch (error: any) {
//     yield put(fetchPlacesFailure(error.message));
//   }
// }

// function* fetchPlaceByIdSaga(action: PayloadAction<string>) {
//   try {
//     const data = yield call(fetchPlaceById, action.payload);
//     yield put(fetchPlaceByIdSuccess(data));
//   } catch (error: any) {
//     yield put(fetchPlaceByIdFailure(error.message));
//   }
// }

// function* createPlaceSaga(action: PayloadAction<FormData>) {
//   try {
//     yield call(createPlace, action.payload);
//     yield put(createPlaceSuccess());
//   } catch (error: any) {
//     yield put(createPlaceFailure(error.message));
//   }
// }

// function* updatePlaceSaga(action: PayloadAction<{ id: string; data: FormData }>) {
//   try {
//     yield call(updatePlace, action.payload.id, action.payload.data);
//     yield put(updatePlaceSuccess());
//   } catch (error: any) {
//     yield put(updatePlaceFailure(error.message));
//   }
// }

// function* deletePlaceSaga(action: PayloadAction<string>) {
//   try {
//     yield call(deletePlace, action.payload);
//     yield put(deletePlaceSuccess());
//   } catch (error: any) {
//     yield put(deletePlaceFailure(error.message));
//   }
// }

// export default function* placeSaga() {
//   yield takeLatest(fetchPlacesRequest.type, fetchPlacesSaga);
//   yield takeLatest(fetchPlaceByIdRequest.type, fetchPlaceByIdSaga);
//   yield takeLatest(createPlaceRequest.type, createPlaceSaga);
//   yield takeLatest(updatePlaceRequest.type, updatePlaceSaga);
//   yield takeLatest(deletePlaceRequest.type, deletePlaceSaga);
// }



