import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {deletePresetRealm} from '@app/db/actions/deletePresetRealm';
import {IExercise} from '@app/types/IExercise';
import {IPreset} from '@app/types/IPreset';

export interface RecordsSlice {
  presets: IPreset[];
}

const initialState: RecordsSlice = {
  presets: [],
};

const presetsSlice = createSlice({
  name: 'presetsSlice',
  initialState,
  reducers: {
    setPresets(state, action: PayloadAction<IPreset[]>) {
      state.presets = action.payload;
    },
    addPreset(state, action: PayloadAction<IPreset>) {
      state.presets = [...state.presets, action.payload];
    },
    updatePreset(state, action: PayloadAction<IPreset>) {
      state.presets = state.presets.map(preset => {
        if (preset.id === action.payload.id) {
          return action.payload;
        }
        return preset;
      });
    },
    deletePreset(state, action: PayloadAction<string>) {
      state.presets = state.presets.filter(preset => {
        if (preset.id == action.payload) {
          deletePresetRealm(preset);
          return false;
        }
        return true;
      });
    },
    addExercisesToPreset(
      state,
      action: PayloadAction<{exercises: IExercise[]; presetId: string}>,
    ) {
      state.presets = state.presets.map(preset => {
        if (preset.id === action.payload.presetId) {
          return {
            ...preset,
            exercises: [...preset.exercises, ...action.payload.exercises],
          };
        }

        return preset;
      });
    },
    updateExerciseInPreset(
      state,
      action: PayloadAction<{exercise: IExercise; presetId: string}>,
    ) {
      state.presets = state.presets.map(preset => {
        if (preset.id === action.payload.presetId) {
          return {
            ...preset,
            exercises: preset.exercises.map(exercise => {
              if (exercise.id === action.payload.exercise.id) {
                return action.payload.exercise;
              }

              return exercise;
            }),
          };
        }

        return preset;
      });
    },
    deleteExerciseInPreset(
      state,
      action: PayloadAction<{exercise: IExercise; presetId: string}>,
    ) {
      state.presets = state.presets.map(preset => {
        if (preset.id === action.payload.presetId) {
          return {
            ...preset,
            exercises: preset.exercises.filter(
              ex => ex.id !== action.payload.exercise.id,
            ),
          };
        }

        return preset;
      });
    },
    changeExercisesOrderingInPreset(
      state,
      action: PayloadAction<{exercises: IExercise[]; presetId: string}>,
    ) {
      state.presets = state.presets.map(preset => {
        if (preset.id === action.payload.presetId) {
          return {...preset, exercises: action.payload.exercises};
        }

        return preset;
      });
    },
  },
});

export const {
  addPreset,
  deletePreset,
  setPresets,
  updatePreset,
  addExercisesToPreset,
  updateExerciseInPreset,
  deleteExerciseInPreset,
  changeExercisesOrderingInPreset,
} = presetsSlice.actions;
export default presetsSlice.reducer;
