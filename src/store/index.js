import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'usersSlice/changeUserNeedUpdateAvatar',
          'usersSlice/createUser/fulfilled',
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
