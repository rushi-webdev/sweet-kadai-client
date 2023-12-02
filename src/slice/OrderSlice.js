import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const baseUrl=process.env.REACT_APP_BASE_URL;

// Create an asynchronous thunk to fetch user orders from the MongoDB database.
export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/orders/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

// Create an asynchronous thunk to post the order to the backend using Axios.
export const postOrder = createAsyncThunk('orders/postOrder', async (orderData) => {
  try {
    const response = await axios.post(`${baseUrl}/orders`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchOrderAddress = createAsyncThunk('orders/fetchOrderAddress', async (orderId) => {
  try {
    const response = await axios.post(`${baseUrl}/address/orderAddress`, {orderId});
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchSingleOrderDetails = createAsyncThunk('orders/fetchSingleOrderDetails', async (id) => {
  try {
    const response = await axios.post(`${baseUrl}/order/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the order slice with initial state, reducers, and the async thunks
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    singleOrder:{},
    addresses: {},
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(postOrder.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.loading = 'fulfilled';
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(fetchOrderAddress.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchOrderAddress.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.addresses[action.meta.arg] = action.payload; // Store the address by order ID
        state.error = null;
      })
      .addCase(fetchOrderAddress.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(fetchSingleOrderDetails.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSingleOrderDetails.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.singleOrder = action.payload; // Store the address by order ID
        state.error = null;
      })
      .addCase(fetchSingleOrderDetails.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});

// Export the async thunks and the reducer
// export { fetchUserOrders, postOrder };
export default orderSlice.reducer;
