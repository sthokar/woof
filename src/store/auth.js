import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

export const login = createAsyncThunk(
  'auth/login',
  async (formData) => {
    const response = await fetch(
      'https://frontend-take-home-service.fetch.com/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in request
        body: JSON.stringify(formData),
      }
    );
    console.log(response)

    if (response.ok) {
   
      return true;
    } else {
      throw new Error('Login failed');
    }
  }
);
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await fetch(
      'https://frontend-take-home-service.fetch.com/auth/logout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in request
       
      }
    );
   

    if (response.ok) {
      return true;
    } else {
      throw new Error('Logout failed');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    redirectModalVisible: false,
    loggingOutModalVisible: false,
    loading: false,
    error: null,
  },
  reducers: {
    setShowRedirectModal: (state, action) => {
      state.redirectModalVisible = action.payload;
    },
    setShowLogoutModal: (state, action) => {
      state.loggingOutModalVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
        
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.redirectModalVisible = false;
        state.loggingOutModalVisible = true;


      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setShowRedirectModal, setShowLogoutModal } = authSlice.actions;



export default authSlice.reducer;
