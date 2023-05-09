import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (zipCodes) => {
    const zipCodesString = zipCodes.join(",");
    const response = await axios.get(
      `https://api.zippopotam.us/us/${zipCodesString}`
    );
    const locations = response.data.places.map((place) => ({
      city: place["place name"],
      latitude: parseFloat(place.latitude),
      county: place.county,
      state: place.state,
      zip_code: place["post code"],
      longitude: parseFloat(place.longitude),
    }));
    return locations;
  }
);



export default locationsSlice.reducer;
