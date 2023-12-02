// forgotPasswordSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl=process.env.REACT_APP_BASE_URL;

// Async thunk for sending the reset password email
export const sendResetPasswordEmail = createAsyncThunk(
  'forgotPassword/sendResetPasswordEmail',
  async (email) => {
    try {
      const response = await axios.post(`${baseUrl}/forgot-password`, { email });
      return response?.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


export const resetPassword = createAsyncThunk(
    'forgotPassword/resetPassword',
    async ({ token, newPassword }) => {
      const response = await axios.post(`${baseUrl}/reset-password/${token}`, { newPassword });
      return response.data;
    }
  );

// Create the forgot password slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    message: '',
    resetMessage:'',
    loading: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendResetPasswordEmail.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(sendResetPasswordEmail.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.message = action.payload.message;
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.loading = 'rejected';
        state.message = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.resetMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = 'idle';
        state.resetMessage = 'Error resetting password';
      });
  },
});

// Export the async thunk for use in components
// export { sendResetPasswordEmail };

// Export the reducer
export default forgotPasswordSlice.reducer;
