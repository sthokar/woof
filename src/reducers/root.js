import { combineReducers } from "redux";
import searchReducer from "../store/searchSlice";
import breedsReducer from "../store/breedSlice";
import mapReducer from "../store/mapSlice";
import favoriteDogsReducer from "../store/favoriteSlice";
import authSliceReducer from "../store/auth"

const rootReducer = combineReducers({
  breeds: breedsReducer,
  search: searchReducer,
  map: mapReducer,
  favoriteDogs : favoriteDogsReducer,
  auth: authSliceReducer
});

export default rootReducer;
