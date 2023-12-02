// userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl=process.env.REACT_APP_BASE_URL;

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId, { rejectWithValue }) => {
  try {
    if (!userId) {
      // If userId is null, return null or handle as appropriate
      return null;
    }

    const response = await axios.get(`${baseUrl}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);

    // Use rejectWithValue to pass the error message to the Redux store
    return rejectWithValue('Failed to fetch user data');
  }
});

export const registerUser = createAsyncThunk('user/register', async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Failed to log in');
  }
});

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Users');
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async (userData) => {
  const response = await axios.put(`${baseUrl}/update`, userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // For single user details
    allUsers: [],      // For the list of all users
    update:null,
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })//update user data
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.update = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default userSlice.reducer;
