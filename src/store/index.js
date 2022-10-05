import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import articlesSlice from './slices/articlesSlice';
import bedsSlice from './slices/bedsSlice';
import categoriesSlice from './slices/categoriesSlice';
import clinicsSlice from './slices/clinicsSlice';
import roomsSlice from './slices/roomsSlice';
import servicesSlice from './slices/servicesSlice';
import tagsSlice from './slices/tagsSlice';
import typesSlice from './slices/typesSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesSlice,
    services: servicesSlice,
    clinics: clinicsSlice,
    rooms: roomsSlice,
    beds: bedsSlice,
    articles: articlesSlice,
    tags: tagsSlice,
    types: typesSlice,
  },
  middleware: () =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   // Ignore these action types
      //   ignoredActions: [
      //     'usersSlice/changeUserNeedUpdateAvatar',
      //     'usersSlice/createUser/fulfilled',
      //     'usersSlice/getAllUsers/pending',
      //     'categoriesSlice/getCategories/pending',
      //     'categoriesSlice/createCategory/fulfilled',
      //     'servicesSlice/createService/fulfilled',
      //     'servicesSlice/updateService/fulfilled',
      //     'clinicsSlice/updateClinic/fulfilled',
      //     'clinicSlice/addClinicNeedUpdateImage',
      //     'clinicSlice/deleteClinicNeedUpdateImage',
      //     'articlesSlice/updateUploadingFilesWritingArticle',
      //   ],
      //   // Ignore these field paths in all actions
      //   ignoredActionPaths: ['articles.writingArticle.uploadingFiles.0'],
      //   // Ignore these paths in the state
      //   ignoredPaths: ['items.dates'],
      // },
      serializableCheck: false,
    }),
});
