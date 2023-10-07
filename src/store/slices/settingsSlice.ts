import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import localStorage, {LocalStorageKeysEnum} from '@app/utilts/localStorage';

export interface SettingsSlice {
  enableAutocomplete: boolean;
  exercisesForAutocomplete: string[];
}

const initialState: SettingsSlice = {
  enableAutocomplete: true,
  exercisesForAutocomplete: [],
};

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    setEnableAutocomplete: (state, action: PayloadAction<boolean>) => {
      state.enableAutocomplete = action.payload;
    },
    setExercisesForAutocomplete: (state, action: PayloadAction<string[]>) => {
      state.exercisesForAutocomplete = action.payload;
    },
    addExerciseForAutocomplete: (state, action: PayloadAction<string>) => {
      const exercises = [
        action.payload,
        ...state.exercisesForAutocomplete.filter(ex => ex !== action.payload),
      ];

      state.exercisesForAutocomplete = exercises;

      localStorage.set(
        LocalStorageKeysEnum.AUTOCOMPLETE_EXERCISES,
        JSON.stringify(exercises || []),
      );
    },
  },
});

export const {
  setEnableAutocomplete,
  setExercisesForAutocomplete,
  addExerciseForAutocomplete,
} = settingsSlice.actions;
export default settingsSlice.reducer;
