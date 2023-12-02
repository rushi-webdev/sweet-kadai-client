// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl=process.env.REACT_APP_BASE_URL;
// Define the initial state
const initialState = {
  products: [],
  product:null,
  loading: false,
  error: null,
};

// Create an async thunk to fetch products from the backend API

const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await fetch(`${baseUrl}/products`); // Replace with your API endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchSingleProduct = createAsyncThunk('products/fetchSingleProduct', async (productId) => {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`); // 
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

// const response = await fetch("http://127.0.0.1:5000/products", {
      //   method: "POST",
      //   body: formData,
      // });

export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      body: productData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});
export const selectError = (state) => state.products.error;
export const selectLoading = (state) => state.products.loading;
// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, update state.products based on your requirements
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

// Export the actions for use in components
export { fetchProducts };