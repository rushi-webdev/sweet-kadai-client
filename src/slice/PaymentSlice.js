import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl=process.env.REACT_APP_BASE_URL;

export const fetchRazorpayId = createAsyncThunk('data/fetchData', async () => {
    const response = await axios.get(baseUrl);
    return response.data;
});

const razorpayIdSlice = createSlice({
    name: 'razorpayId',
    initialState: { id: null, loading: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRazorpayId.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchRazorpayId.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.id = action.payload;
            })
            .addCase(fetchRazorpayId.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.error.message;
            });
    },
});
export default razorpayIdSlice.reducer;
