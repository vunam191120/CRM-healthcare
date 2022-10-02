import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import articleAPI from '../../api/article';

export const fetchArticles = createAsyncThunk(
  'articlesSlice/fetchArticles',
  async () => {
    try {
      const result = await articleAPI.getAll();
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchArticle = createAsyncThunk(
  'articlesSlice/fetchArticle',
  async (article_id) => {
    try {
      const result = await articleAPI.getOne(article_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchAuthor = createAsyncThunk(
  'articlesSlice/fetchAuthor',
  async (author_id) => {
    try {
      const result = await articleAPI.getAuthor(author_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  'articlesSlice/createArticle',
  async (article) => {
    try {
      const result = await articleAPI.create(article);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articlesSlice/updateArticle',
  async (article) => {
    try {
      await articleAPI.update(article);
      return article;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articlesSlice/deleteArticle',
  async (article_id) => {
    try {
      const result = await articleAPI.delete(article_id);
      if (result.data.data === 1) {
        return article_id;
      } else {
        return Promise.reject('Delete failed');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
// Reducer

const articlesSlice = createSlice({
  name: 'articlesSlice',
  initialState: {
    articles: [],
    articleNeedUpdate: {},
    selectAuthor: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Articles
    [fetchArticles.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchArticles.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Article
    [fetchArticle.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.articleNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchArticle.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Author
    [fetchAuthor.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchAuthor.fulfilled]: (state, action) => {
      state.selectAuthor = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchAuthor.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Article
    [createArticle.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createArticle.fulfilled]: (state, action) => {
      state.articles = [...state.articles, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new article successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createArticle.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Article
    [updateArticle.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateArticle.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update article successfully!', 3));
      state.articles = state.articles.map((article) => {
        if (article.article_id === action.payload.article_id) {
          article = { ...article, ...action.payload };
        }
        return article;
      });
      state.articleNeedUpdate = {
        ...state.articleNeedUpdate,
        ...action.payload,
      };
      state.isLoading = false;
      state.hasError = false;
    },
    [updateArticle.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Article
    [deleteArticle.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteArticle.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted article successfully!', 3));
      state.beds = state.beds.filter((bed) => bed.bed_id !== action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteArticle.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors

export const selectArticles = (state) => state.articles.articles;

export const selectArticlesLoading = (state) => state.articles.isLoading;

export const selectArticlesError = (state) => state.articles.hasError;

export const selectArticleNeedUpdate = (state) => state.articles.bedNeedUpdate;

export default articlesSlice.reducer;
