// authSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
const baseUrl=process.env.REACT_APP_BASE_URL;


export const fetchProtectedData = createAsyncThunk(
  'auth/fetchProtectedData',
  async (_, { getState }) => {
    const token = getState().auth.token;

    try {
      const response = await axios.get(`${baseUrl}/protected`, {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


const getTokenFromStorage = () => {
  return secureLocalStorage.getItem('token');
};

const auth = createSlice({
  name: 'auth',
  initialState: {
    token: getTokenFromStorage(),
    isAuthenticated: !!getTokenFromStorage(),
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      secureLocalStorage.setItem('token', action.payload); // Persist the token in local storage
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      secureLocalStorage.removeItem('userId');
      secureLocalStorage.removeItem('token'); // Remove the token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProtectedData.fulfilled, (state, action) => {
        // Handle successful fetch if needed
      })
      .addCase(fetchProtectedData.rejected, (state, action) => {
        // Handle error if needed
      });
  },
});

export const { login,logout } = auth.actions;

export default auth.reducer;
