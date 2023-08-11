import {configureStore} from '@reduxjs/toolkit';

import trainingDayReducer from './slices/trainingDaySlice';

const store = configureStore({
  reducer: {
    trainingDay: trainingDayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
