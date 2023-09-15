import {configureStore} from '@reduxjs/toolkit';

import realmMiddleware from './middlewares/realmMiddleware';

import exerciseFormFallbackReducer from './slices/exerciseFormFallbackSlice';
import recordsReducer from './slices/recordsSlice';
import trainingDayReducer from './slices/trainingDaySlice';

const store = configureStore({
  reducer: {
    trainingDay: trainingDayReducer,
    exerciseFormFallback: exerciseFormFallbackReducer,
    records: recordsReducer,
  },
  middleware: [realmMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
