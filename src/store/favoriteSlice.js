import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const favoriteDogsSlice = createSlice({
    name: 'favoriteDogs',
    initialState: { dogs: [], match: null }, // Update the initial state structure
    reducers: {
      addFavoriteDog: (state, action) => {
        state.dogs.push(action.payload); // Access the dogs array in the state
      },
      removeFavoriteDog: (state, action) => {
        state.dogs = state.dogs.filter((dog) => dog.id !== action.payload.id); // Update the dogs array
      },
    },
    extraReducers: (builder) => {
      builder.addCase(matchDogs.fulfilled, (state, action) => {
        state.match = action.payload;
      });
    },
  });
  

export const matchDogs = createAsyncThunk(
  'favoriteDogs/match',
  async (dogIds, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/dogs/match',
        dogIds,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include cookies in the request
        }
      );
      return response.data.match;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const { addFavoriteDog, removeFavoriteDog } = favoriteDogsSlice.actions;

export default favoriteDogsSlice.reducer;
