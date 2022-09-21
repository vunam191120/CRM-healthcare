import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import categoryAPI from '../../api/category';

// Side effect actions
export const fetchCategories = createAsyncThunk(
  'categoriesSlice/getCategories',
  async () => {
    try {
      const result = await categoryAPI.getAll();
      return result.data.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  'categoriesSlice/getCategory',
  async (category_id) => {
    try {
      const result = await categoryAPI.getOne(category_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categoriesSlice/createCategory',
  async (category) => {
    try {
      const result = await categoryAPI.create(category);
      return result;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categoriesSlice/updateCategory',
  async (category) => {
    try {
      const result = await categoryAPI.update(category);
      console.log(result);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categoriesSlice/deleteCategory',
  async (category_id) => {
    try {
      const result = await categoryAPI.delete(category_id);
      if (result.data.data === 1) {
        return category_id;
      } else {
        return Promise.reject('Delete failed');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

// Reducer
const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState: {
    categories: [],
    categoryNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Categories
    [fetchCategories.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchCategories.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Category
    [fetchCategory.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.categoryNeedUpdate = {
        ...state.categoryNeedUpdate,
        ...action.payload,
      };
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchCategory.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Category
    [createCategory.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.categories = [...state.categories, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new category successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createCategory.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Category
    [updateCategory.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateCategory.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update category successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [updateCategory.rejected]: (state, action) => {
      console.log('erorr', action.error.message);
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Category
    [deleteCategory.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted category successfully!', 3));
      state.categories = state.categories.filter(
        (category) => category.category_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteCategory.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Actions

// Selectors
export const selectCategories = (state) => state.categories.categories;

export const selectCategoriesLoading = (state) => state.categories.isLoading;

export const selectCategoriesError = (state) => state.categories.hasError;

export const selectCategoryNeedUpdate = (state) =>
  state.categories.categoryNeedUpdate;

export default categoriesSlice.reducer;
