import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const baseUrl=process.env.REACT_APP_BASE_URL;

// Create an asynchronous thunk to fetch user orders from the MongoDB database.
export const postCategory = createAsyncThunk('category/postCategory', async (category,{rejectWithValue}) => {
  try {
    const response =await axios.post(`${baseUrl}/category`,{name:category});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Define the order slice with initial state, reducers, and the async thunks
const adminSlice = createSlice({
  name: 'postCategory',
  initialState: {
    category:"",
    status: 'idle',
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCategory.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.category=action.payload   ;
        state.error = null;
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
  },
});

// Export the async thunks and the reducer
// export { fetchUserOrders, postOrder };
export default adminSlice.reducer;
