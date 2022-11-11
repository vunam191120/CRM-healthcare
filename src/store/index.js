import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import appointmentsSlice from './slices/appointmentsSlice';
import articlesSlice from './slices/articlesSlice';
import bedsSlice from './slices/bedsSlice';
import categoriesSlice from './slices/categoriesSlice';
import clinicsSlice from './slices/clinicsSlice';
import doctorsSlice from './slices/doctorsSlice';
import roomsSlice from './slices/roomsSlice';
import servicesSlice from './slices/servicesSlice';
import tagsSlice from './slices/tagsSlice';
import typesSlice from './slices/typesSlice';
import usersSlice from './slices/usersSlice';
import supportsSlice from './slices/supportsSlice';
import patientsSlice from './slices/patientsSlice';

export default configureStore({
  reducer: {
    users: usersSlice,
    supports: supportsSlice,
    doctors: doctorsSlice,
    categories: categoriesSlice,
    services: servicesSlice,
    clinics: clinicsSlice,
    rooms: roomsSlice,
    beds: bedsSlice,
    articles: articlesSlice,
    tags: tagsSlice,
    types: typesSlice,
    appointments: appointmentsSlice,
    patients: patientsSlice,
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
