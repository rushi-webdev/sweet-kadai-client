// checkoutSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const handleCheckout = createAsyncThunk(
  "checkout/handleCheckout",
  async (totalAmount, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/payment/orders`, {
        amount: totalAmount,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const verifyCheckout = createAsyncThunk(
  "checkout/verifyCheckout",
  async (verifyData, { rejectWithValue }) => {
    console.log(verifyData)
    try {
      const response = await axios.post(`${baseUrl}/api/payment/verify`,verifyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    loading: false,
    orderData: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCheckout.pending, (state) => {
        state.loading = true;
        state.orderData = null;
        state.error = null;
      })
      .addCase(handleCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
        state.error = null;
      })
      .addCase(handleCheckout.rejected, (state, action) => {
        state.loading = false;
        state.orderData = null;
        state.error = action.payload;
      })
      .addCase(verifyCheckout.pending, (state) => {
        state.loading = true;
        state.orderData = null;
        state.error = null;
      })
      .addCase(verifyCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
        state.error = null;
      })
      .addCase(verifyCheckout.rejected, (state, action) => {
        state.loading = false;
        state.orderData = null;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
export const selectCheckout = (state) => state.checkout;
