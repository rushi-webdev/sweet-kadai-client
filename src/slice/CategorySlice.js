// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
//   const response = await fetch("http://127.0.0.1:5000/get-categories");
//   const data = await response.json();
//   return data;
// });

// const categoriesSlice = createSlice({
//   name: 'categories',
//   initialState: {
//     categories: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const fetchProductsByCategory = createAsyncThunk(
//     'products/fetchByCategory',
//     async (category, thunkAPI) => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/products/category/${category}`);
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   );
  
//   const productsByCategorySlice = createSlice({
//     name: 'productsByCategory',
//     initialState: {
//       products: [],
//       status: 'idle',
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchProductsByCategory.pending, (state) => {
//           state.status = 'loading';
//         })
//         .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
//           state.status = 'succeeded';
//           state.products = action.payload;
//         })
//         .addCase(fetchProductsByCategory.rejected, (state, action) => {
//           state.status = 'failed';
//           state.error = action.error.message;
//         });
//     },
//   });
  

// export default categoriesSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseUrl=process.env.REACT_APP_BASE_URL;

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await fetch(`${baseUrl}/get-categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error(error.message);
  }
});

// Async thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/category/${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Categories slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Products by category slice
const productsByCategorySlice = createSlice({
  name: 'productsByCategory',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export both reducers
export const { reducer: categoriesReducer } = categoriesSlice;
export const { reducer: productsByCategoryReducer } = productsByCategorySlice;
