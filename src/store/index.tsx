import {configureStore} from '@reduxjs/toolkit';

import realmMiddleware from './middlewares/realmMiddleware';

import goalsReducer from './slices/goalsSlice';
import presetsReducer from './slices/presetsSlice';
import recordsReducer from './slices/recordsSlice';
import settingsReducer from './slices/settingsSlice';
import trainingDayReducer from './slices/trainingDaySlice';

const store = configureStore({
  reducer: {
    trainingDay: trainingDayReducer,
    records: recordsReducer,
    presets: presetsReducer,
    settings: settingsReducer,
    goals: goalsReducer,
  },
  middleware: [realmMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
