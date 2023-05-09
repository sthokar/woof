import { createStore } from 'redux';

const initialState = {
  dogBreeds: [],
};

function dogBreedsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DOG_BREEDS':
      return {
        ...state,
        dogBreeds: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(dogBreedsReducer);
