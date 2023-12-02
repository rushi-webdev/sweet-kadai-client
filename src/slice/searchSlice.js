// client/src/redux/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl=process.env.REACT_APP_BASE_URL;

export const searchProducts = createAsyncThunk('search/searchProducts', async (query) => {
  try {
    const response = await axios.get(`${baseUrl}/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch search results');
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.results = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
