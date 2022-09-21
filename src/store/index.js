import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import categoriesSlice from './slices/categoriesSlice';
import servicesSlice from './slices/servicesSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesSlice,
    services: servicesSlice,
  },
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'usersSlice/changeUserNeedUpdateAvatar',
          'usersSlice/createUser/fulfilled',
          'usersSlice/getAllUsers/pending',
          'categoriesSlice/getCategories/pending',
          'categoriesSlice/createCategory/fulfilled',
          'servicesSlice/createService/fulfilled',
          'servicesSlice/updateService/fulfilled',
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
