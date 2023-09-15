import {configureStore} from '@reduxjs/toolkit';

import realmMiddleware from './middlewares/realmMiddleware';

import archivementsReducer from './slices/archivementsSlice';
import exerciseFormFallbackReducer from './slices/exerciseFormFallbackSlice';
import trainingDayReducer from './slices/trainingDaySlice';

const store = configureStore({
  reducer: {
    trainingDay: trainingDayReducer,
    exerciseFormFallback: exerciseFormFallbackReducer,
    archivements: archivementsReducer,
  },
  middleware: [realmMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
