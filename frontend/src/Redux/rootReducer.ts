import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import placeReducer from "./slices/placeSlice";
import searchReducer from "./slices/searchSlice";
import hotelReducer from "./slices/hotelSlice";
import heritageReducer from "./slices/heritageSlice"
import userReducer from "./slices/userSlice";
import tagReducer from "./slices/tagSlice";
import imageReducer from "./slices/imageSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
  place: placeReducer,
  search: searchReducer,
  hotel: hotelReducer,
  heritage: heritageReducer,
  user:userReducer,
  tag: tagReducer,
  image: imageReducer
});
