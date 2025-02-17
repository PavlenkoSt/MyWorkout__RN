import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {FilterGoalsEnum} from '@app/screens/Goals/constants';
import {
  localStorageService,
  LocalStorageKeysEnum,
} from '@app/services/localStorage.service';

export interface SettingsSlice {
  enableAutocomplete: boolean;
  exercisesForAutocomplete: string[];
  defaultGoalsFilter: FilterGoalsEnum;
  enableStartRestTimerAfterStaticExercise: boolean;
  enableExerciseScreen: boolean;
}

const initialState: SettingsSlice = {
  enableAutocomplete: false,
  enableStartRestTimerAfterStaticExercise: false,
  enableExerciseScreen: false,
  exercisesForAutocomplete: [],
  defaultGoalsFilter: FilterGoalsEnum.ALL,
};

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    setEnableAutocomplete: (state, action: PayloadAction<boolean>) => {
      state.enableAutocomplete = action.payload;
    },
    setEnableExerciseScreen: (state, action: PayloadAction<boolean>) => {
      state.enableExerciseScreen = action.payload;
    },
    setExercisesForAutocomplete: (state, action: PayloadAction<string[]>) => {
      state.exercisesForAutocomplete = action.payload;
    },
    setDefaultGoalsFilter: (state, action: PayloadAction<FilterGoalsEnum>) => {
      state.defaultGoalsFilter = action.payload;
    },
    addExerciseForAutocomplete: (state, action: PayloadAction<string>) => {
      const exercises = [
        action.payload,
        ...state.exercisesForAutocomplete.filter(ex => ex !== action.payload),
      ];

      state.exercisesForAutocomplete = exercises;

      localStorageService.set(
        LocalStorageKeysEnum.AUTOCOMPLETE_EXERCISES,
        JSON.stringify(exercises || []),
      );
    },
    removeExerciseForAutocomplete: (state, action: PayloadAction<string>) => {
      const filtered = state.exercisesForAutocomplete.filter(
        ex => ex !== action.payload,
      );

      state.exercisesForAutocomplete = filtered;

      localStorageService.set(
        LocalStorageKeysEnum.AUTOCOMPLETE_EXERCISES,
        JSON.stringify(filtered || []),
      );
    },
    setEnableStartRestTimerAfterStaticExercise: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.enableStartRestTimerAfterStaticExercise = action.payload;
    },
  },
});

export const {
  setEnableAutocomplete,
  setDefaultGoalsFilter,
  setExercisesForAutocomplete,
  addExerciseForAutocomplete,
  removeExerciseForAutocomplete,
  setEnableStartRestTimerAfterStaticExercise,
  setEnableExerciseScreen,
} = settingsSlice.actions;
export default settingsSlice.reducer;
