import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import ProductAPI from '../../api/product';

export const fetchProducts = createAsyncThunk(
  'productsSlice/fetchProducts',
  async () => {
    try {
      const result = await ProductAPI.getAll();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'productsSlice/fetchProduct',
  async (product_id) => {
    try {
      const result = await ProductAPI.getOne(product_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchSuppliers = createAsyncThunk(
  'productsSlice/fetchSuppliers',
  async () => {
    try {
      const result = await ProductAPI.getSupplier();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'productsSlice/addProduct',
  async (newProduct) => {
    try {
      await ProductAPI.addProduct(newProduct);
      return newProduct;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'productsSlice/updateProduct',
  async (newProduct) => {
    try {
      await ProductAPI.updateProduct(newProduct);
      return newProduct;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'productsSlice/deleteProduct',
  async (product_id) => {
    try {
      await ProductAPI.delete(product_id);
      return product_id;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: {
    products: [],
    suppliers: [],
    productNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch products
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch product
    [fetchProduct.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.productNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchProduct.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch suppliers
    [fetchSuppliers.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchSuppliers.fulfilled]: (state, action) => {
      state.suppliers = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchSuppliers.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Add Product
    [addProduct.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addProduct.fulfilled]: (state, action) => {
      message.success('Added new product successfully!');
      state.isLoading = false;
      state.hasError = false;
    },
    [addProduct.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Product
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      message.success('Updated product successfully!');
      state.productNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [updateProduct.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Product
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      message.success('Deleted product successfully!');
      state.products = state.products.filter(
        (product) => product.product_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteProduct.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors

export const selectProducts = (state) => state.products.products;

export const selectSuppliers = (state) => state.products.suppliers;

export const selectProductNeedUpdate = (state) =>
  state.products.productNeedUpdate;

export const selectProductsIsLoading = (state) => state.products.isLoading;

export default productsSlice.reducer;
