import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import datesService from '@app/services/dates.service';
import {IExercise} from '@app/types/IExercise';
import {ITrainingDay} from '@app/types/ITrainingDay';

interface IState {
  activeDate: string;
  trainingDay: ITrainingDay | null;
}

const initialState: IState = {
  activeDate: datesService.today,
  trainingDay: {
    date: datesService.today,
    exercises: [],
  },
};

const trainingDaySlice = createSlice({
  name: 'trainingDay',
  initialState,
  reducers: {
    changeActiveDate: (state, action: PayloadAction<string>) => {
      state.activeDate = action.payload;
    },
    changeTrainingDay: (state, action: PayloadAction<ITrainingDay>) => {
      state.trainingDay = action.payload;
    },
    addExercise: (state, action: PayloadAction<IExercise>) => {
      if (!state.trainingDay) {
        throw new Error('Trying to addExercise, but no training day is active');
      }

      state.trainingDay.exercises.push(action.payload);
    },
    updateExercise: (state, action: PayloadAction<IExercise>) => {
      if (!state.trainingDay) {
        throw new Error(
          'Trying to updateExercise, but no training day is active',
        );
      }

      state.trainingDay.exercises = state.trainingDay.exercises.map(
        exercise => {
          if (exercise.id === action.payload.id) return action.payload;

          return exercise;
        },
      );
    },
    incrementSet: (state, action: PayloadAction<{id: string}>) => {
      if (!state.trainingDay) {
        throw new Error(
          'Trying to incrementSet, but no training day is active',
        );
      }

      state.trainingDay.exercises = state.trainingDay.exercises.map(
        exercise => {
          if (exercise.id === action.payload.id) {
            return {...exercise, setsDone: exercise.setsDone + 1};
          }

          return exercise;
        },
      );
    },
    decrementSet: (state, action: PayloadAction<{id: string}>) => {
      if (!state.trainingDay) {
        throw new Error(
          'Trying to incrementSet, but no training day is active',
        );
      }

      state.trainingDay.exercises = state.trainingDay.exercises.map(
        exercise => {
          if (exercise.id === action.payload.id) {
            return {...exercise, setsDone: exercise.setsDone - 1};
          }

          return exercise;
        },
      );
    },
  },
});

export const {
  changeActiveDate,
  changeTrainingDay,
  addExercise,
  updateExercise,
  incrementSet,
  decrementSet,
} = trainingDaySlice.actions;
export default trainingDaySlice.reducer;
