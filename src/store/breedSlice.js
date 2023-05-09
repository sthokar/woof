import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  breeds: [],
  isLoading: false,
  error: null,
};

const breedSlice = createSlice({
  name: "breeds",
  initialState,
  reducers: {
    fetchBreedsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchBreedsSuccess(state, action) {
      state.isLoading = false;
      state.breeds = action.payload;
    },
    fetchBreedsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBreedsStart, fetchBreedsSuccess, fetchBreedsFailure } =
  breedSlice.actions;


export const fetchBreeds = createAsyncThunk(
  "dogs/breed",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(fetchBreedsStart()); // set isLoading to true

      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        { 
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch breeds");
      }
      const breeds  = await response.json();
      dispatch(fetchBreedsSuccess(breeds)); // set isLoading to false and update breeds
      return breeds;
    } catch (error) {
      dispatch(fetchBreedsFailure(error.message)); // set isLoading to false and update error
      return rejectWithValue(error.message);
    }
  }
);

export default breedSlice.reducer;
