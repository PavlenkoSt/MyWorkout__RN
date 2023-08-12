import {configureStore} from '@reduxjs/toolkit';

import realmMiddleware from './middlewares/realmMiddleware';
import trainingDayReducer from './slices/trainingDaySlice';

const store = configureStore({
  reducer: {
    trainingDay: trainingDayReducer,
  },
  middleware: [realmMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
