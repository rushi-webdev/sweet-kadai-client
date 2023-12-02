// addressSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl=process.env.REACT_APP_BASE_URL;

// Define the initial state for user addresses
const initialState = {
  addresses: [],
  // orderAddress:[],
  deleting: false,
  deleteError: null,
  status: 'idle',
  error: null,
};

// Create an async thunk to fetch user addresses
export const fetchUserAddresses = createAsyncThunk('address/fetchUserAddresses', async (userId) => {
  try {
    // Make an API request to fetch user addresses based on userId
    const response = await fetch(`${baseUrl}/address/${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch user addresses: ${data.message}`);
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user addresses: ${error.message}`);
  }
});


// Create an async thunk to post a new user address
export const postUserAddress = createAsyncThunk('address/postUserAddress', async (addressData) => {
  // Make an API request to post a new user address
  const response = await fetch(`${baseUrl}/address`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addressData),
  });
  const data = await response.json();
  return data;
});

export const deleteAddress = createAsyncThunk('address/deleteAddress', async (addressId) => {
  try {
    // Make an API request to delete the address using the addressId in the request body
    const response = await axios.delete(`${baseUrl}/address`, { data: { addressId } });
    return response.data; // Return the deleted address ID for further processing
  } catch (error) {
    throw error.response.data;
  }
});

// export const getOrderAddress = createAsyncThunk('address/getOrderAddress', async (addressId) => {
//   // Make an API request to fetch a specific user address by its ID
//   const response = await fetch('http://127.0.0.1:5000/address/addressId', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(addressId),
//   });
//   const data = await response.json();
//   return data;
// });
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deleting = false;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.error.message;
      })
      // .addCase(getOrderAddress.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(getOrderAddress.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.orderAddress = action.payload;
      // })
      // .addCase(getOrderAddress.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })
      .addCase(postUserAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postUserAddress.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(postUserAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { actions } = addressSlice;
export default addressSlice.reducer;
