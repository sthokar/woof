import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    breeds: [],
    dogs: [],
    nextEndpoint: false,
    prevEndpoint: false,
    showNext: "",
    showPrev: "",
    dogsData: [],
    dogDetails: [], // Add this line to initialize the new state
    mapDetails: []
  },
  reducers: {
    setBreeds(state, action) {
      state.breeds = action.payload;
    },
    setDogs(state, action) {
      state.dogs = action.payload;
    },
    setNextEndpoint(state, action) {
      state.nextEndpoint = action.payload;
    },
    setPrevEndpoint(state, action) {
      state.prevEndpoint = action.payload;
    },
    setShowNext(state, action) {
      state.showNext = action.payload;
    },
    setDogsData(state, action) {
      state.dogsData = action.payload;
    },
    setDogDetails(state, action) {
      state.dogDetails = action.payload;
    },
    setShowPrev(state, action) {
      state.showPrev = action.payload;
    },
    setMapDetails(state, action) {
        state.mapDetails = action.payload;
      },
  },
});
const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const {
  setBreeds,
  setDogs,
  setNextEndpoint,
  setPrevEndpoint,
  setShowNext,
  setDogDetails,
  setShowPrev,
  setMapDetails
} = searchSlice.actions;
async function fetchDogDetails(resultIds) {
  try {
    const response = await fetch(`${API_BASE_URL}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(resultIds),
    });

    const dogDetails = await response.json();
    return dogDetails;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export const searchDogs = (breed, sort, zipcode) => async (dispatch) => {
  try {
    let apiUrl = `${API_BASE_URL}/dogs/search?breeds=${breed}&sort=name:${sort}`;
    if (zipcode) {
      console.log(zipcode)
      apiUrl += `&zipCodes=${zipcode.value}`;
    }
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    dispatch(setDogs(data.resultIds));
    dispatch(setNextEndpoint(data.next));
    dispatch(setShowPrev(false));
    if (!data.next) {
      dispatch(setShowNext(false));
    } else {
      dispatch(setShowNext(true));
    }

    const dogDetails = await fetchDogDetails(data.resultIds);
    dispatch(setDogDetails(dogDetails));
  } catch (error) {
    console.log(error);
  }
};


export const handleNextClick = (sort) => async (dispatch, getState) => {
  const { nextEndpoint } = getState().search;

  if (nextEndpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${nextEndpoint}${sort}`, {
        credentials: "include",
      });

      const data = await response.json();
      const resultIds = data.resultIds;

      // Dispatch another fetch request for each `resultId`
      const dogsData = await fetchDogDetails(resultIds);
      if (dogsData.length) {
        dispatch(setDogDetails(dogsData));
      }

      if (data.prev && dogsData.length) {
        dispatch(setPrevEndpoint(data.prev));
        dispatch(setShowPrev(true));
      }

      if (data.next && dogsData.length) {
        dispatch(setNextEndpoint(data.next));
        dispatch(setShowNext(true));
        console.log("next", data.next);
      } else {
        console.log("no next", data.next);
        dispatch(setShowNext(false));
      }
    } catch (error) {
      console.log(error);
    }
  }
};
export const handlePrevClick = (sort) => async (dispatch, getState) => {
  const { prevEndpoint } = getState().search;

  if (prevEndpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${prevEndpoint}${sort}`, {
        credentials: "include",
      });

      const data = await response.json();
      const resultIds = data.resultIds;

      // Dispatch another fetch request for each `resultId`
      const dogsData = await fetchDogDetails(resultIds);
      if (dogsData.length) {
        dispatch(setDogDetails(dogsData));
      }

      if (data.prev && dogsData.length) {
        dispatch(setPrevEndpoint(data.prev));
        dispatch(setShowPrev(true));
      } else {
        dispatch(setShowPrev(false));
        dispatch(setPrevEndpoint(""));
      }

      if (data.next && dogsData.length) {
        dispatch(setShowNext(true));
        dispatch(setNextEndpoint(data.next));
      }
    } catch (error) {
      console.log(error);
    }
  }
};
export const fetchLocations = createAsyncThunk(
    "location/fetchLocations",
    async (location, { rejectWithValue, dispatch }) => {
      console.log("location",location)
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(location),
        };
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/locations",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        console.log("locationdispatch",data)
        dispatch(setMapDetails(data))
       
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  export const handleSearch = createAsyncThunk(
    "location/fetchLocations",
     async (search) => {
      try {
        console.log("Search",search)
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({"city" : `${search}`} ),

        };
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/locations/search",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        console.log("data is here",data)
        return data
       
      } catch (error) {
        return error.message;
      }
    });

export default searchSlice.reducer;
