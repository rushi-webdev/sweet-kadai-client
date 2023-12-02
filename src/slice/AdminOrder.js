// adminOrderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl=process.env.REACT_APP_BASE_URL;
export const getAllOrders = createAsyncThunk('adminOrders/getAllOrders', async () => {
  const response = await axios.get(`${baseUrl}/orders`); // Adjust the API endpoint as needed
  return response.data
});

// Async thunk to change order status
export const changeOrderStatus = createAsyncThunk(
  'adminOrders/changeOrderStatus',
  async ({ orderId, newStatus }, { rejectWithValue }) => {
    console.log(orderId)
    try {
      const response = await axios.post(`${baseUrl}/orders/${orderId}/status`, {
        status: newStatus,
      });
      return { orderId, newStatus, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderDetail = createAsyncThunk(
  'adminOrders/orderDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/admin/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state
const initialState = {
  orders: [],
  order:[],
  status: 'idle',
  error: null,
};

// Create a slice for orders
const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the getAllOrders thunk
    builder.addCase(getAllOrders.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.orders = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(orderDetail.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(orderDetail.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.order = action.payload;
    });
    builder.addCase(orderDetail.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(changeOrderStatus.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Update the order with the new status in the state
      const { orderId, newStatus, data } = action.payload;
      state.orders = state.orders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus, ...data } : order
      );
      state.error = null;
    });
    builder.addCase(changeOrderStatus.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// Export the async thunks for use in components

// Export the reducer
export default adminOrderSlice.reducer;
