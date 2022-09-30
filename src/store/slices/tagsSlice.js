import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import tagAPI from '../../api/article/tag';

export const fetchTags = createAsyncThunk('tagsSlice/fetchTags', async () => {
  try {
    const result = await tagAPI.getAll();
    return result.data.data;
  } catch (err) {
    return Promise.reject(err.message);
  }
});

export const fetchTag = createAsyncThunk(
  'tagsSlice/fetchTag',
  async (tag_id) => {
    try {
      const result = await tagAPI.getOne(tag_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createTag = createAsyncThunk(
  'tagsSlice/createTag',
  async (tag) => {
    try {
      const result = await tagAPI.create(tag);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateTag = createAsyncThunk(
  'tagsSlice/updateTag',
  async (tag) => {
    try {
      const result = await tagAPI.update(tag);
      return tag;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteTag = createAsyncThunk(
  'tagsSlice/deleteTag',
  async (tag_id) => {
    try {
      const result = await tagAPI.delete(tag_id);
      if (result.data.data === 1) {
        return tag_id;
      } else {
        return Promise.reject('Delete failed');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
// Reducer

const tagsSlice = createSlice({
  name: 'tagsSlice',
  initialState: {
    tags: [],
    tagNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Tags
    [fetchTags.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchTags.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Tag
    [fetchTag.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchTag.fulfilled]: (state, action) => {
      state.tagNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchTag.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Tag
    [createTag.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createTag.fulfilled]: (state, action) => {
      state.tags = [...state.tags, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new tag successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createTag.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Tag
    [updateTag.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateTag.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update tag successfully!', 3));
      state.tags = state.tags.map((tag) => {
        if (tag.tag_id === action.payload.tag_id) {
          tag = { ...tag, ...action.payload };
        }
        return tag;
      });
      state.tagNeedUpdate = {
        ...state.tagNeedUpdate,
        ...action.payload,
      };
      state.isLoading = false;
      state.hasError = false;
    },
    [updateTag.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Tag
    [deleteTag.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteTag.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted tag successfully!', 3));
      state.tags = state.tags.filter((tag) => tag.tag_id !== action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteTag.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors

export const selectTags = (state) => state.tags.tags;

export const selectTagsLoading = (state) => state.tags.isLoading;

export const selectTagsError = (state) => state.tags.hasError;

export const selectTagNeedUpdate = (state) => state.articles.tagNeedUpdate;

export default tagsSlice.reducer;
