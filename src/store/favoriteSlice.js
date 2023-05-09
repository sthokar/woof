import { createSlice } from '@reduxjs/toolkit';

const favoriteDogsSlice = createSlice({
  name: 'favoriteDogs',
  initialState: [],
  reducers: {
    addFavoriteDog: (state, action) => {
        console.log("favorite dogs",action.payload)
      state.push(action.payload);
    },
    removeFavoriteDog: (state, action) => {
        console.log("favorite remove dogs",action.payload)

      return state.filter((dog) => dog.id !== action.payload.id);

    },
  },
});

export const { addFavoriteDog, removeFavoriteDog } = favoriteDogsSlice.actions;

export default favoriteDogsSlice.reducer;
