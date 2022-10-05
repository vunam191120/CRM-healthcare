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

export const uploadDocument = createAsyncThunk(
  'articlesSlice/uploadDocuments',
  async (documents) => {
    try {
      const result = await articleAPI.uploadDocument(documents);
      return result.data.data;
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
    writingArticle: {
      title: '',
      content: '',
      summary: '',
      uploadingFiles: [],
      uploadedFiles: [],
      tags: [],
      types: [],
      thumbnail: [],
    },
    isLoading: false,
    hasError: false,
  },
  reducers: {
    updateTitleWritingArticle: (state, action) => {
      state.writingArticle.title = action.payload;
    },
    updateContentWritingArticle: (state, action) => {
      state.writingArticle.content = action.payload.content;
    },
    updateSummaryWritingArticle: (state, action) => {
      state.writingArticle.summary = action.payload;
    },
    updateUploadingFilesWritingArticle: (state, action) => {
      state.writingArticle.uploadingFiles = [
        ...state.writingArticle.uploadingFiles,
        action.payload,
      ];
    },
    deleteUploadingFileWritingArticle: (state, action) => {
      const newUploadingFiles = state.writingArticle.uploadingFiles.filter(
        (uploadingFile) => uploadingFile.uid !== action.payload.uid
      );
      state.writingArticle.uploadingFiles = newUploadingFiles;
    },
    resetUploadingFileWritingAritcle: (state, action) => {
      state.writingArticle.uploadingFiles = [];
    },
    updateTagsWritingArticle: (state, action) => {
      state.writingArticle.tags = action.payload;
    },
    updateTypesWritingArticle: (state, action) => {
      state.writingArticle.types = action.payload;
    },
    updateThumbnailWritingArticle: (state, action) => {
      state.writingArticle.thumbnail[0] = action.payload;
    },
    deleteThumbnailWritingArticle: (state, action) => {
      state.writingArticle.thumbnail = [];
    },
    clearWritingArticle: (state, action) => {
      state.writingArticle = {
        title: '',
        content: '',
        summary: '',
        uploadingFiles: [],
        uploadedFiles: [],
        tags: [],
        types: [],
        thumbnail: [],
      };
    },
  },
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
    // Upload document
    [uploadDocument.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [uploadDocument.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Uploaded documents successfully!', 3));
      state.writingArticle.uploadedFiles = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [uploadDocument.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors
export const {
  updateTitleWritingArticle,
  updateContentWritingArticle,
  updateSummaryWritingArticle,
  updateUploadingFilesWritingArticle,
  deleteUploadingFileWritingArticle,
  resetUploadingFileWritingAritcle,
  updateTagsWritingArticle,
  updateTypesWritingArticle,
  updateThumbnailWritingArticle,
  deleteThumbnailWritingArticle,
  clearWritingArticle,
} = articlesSlice.actions;

export const selectArticles = (state) => state.articles.articles;

export const selectArticlesLoading = (state) => state.articles.isLoading;

export const selectArticlesError = (state) => state.articles.hasError;

export const selectArticleNeedUpdate = (state) => state.articles.bedNeedUpdate;

export const selectWritingArticle = (state) => state.articles.writingArticle;

export default articlesSlice.reducer;
