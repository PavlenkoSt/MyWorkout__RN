import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import datesService from '@app/services/dates.service';
import {IExercise} from '@app/types/IExercise';
import {ITrainingDay} from '@app/types/ITrainingDay';
import {getExersises} from '../helpers/TrainingDayHelpers';

export interface ITrainingDayState {
  activeDate: string;
  trainingDays: ITrainingDay[];
}

const initialState: ITrainingDayState = {
  activeDate: datesService.today,
  trainingDays: [],
};

const trainingDaySlice = createSlice({
  name: 'trainingDay',
  initialState,
  reducers: {
    setTrainingDays: (state, action: PayloadAction<ITrainingDay[]>) => {
      state.trainingDays = action.payload;
    },
    changeActiveDate: (state, action: PayloadAction<string>) => {
      state.activeDate = action.payload;
    },
    addExercise: (state, action: PayloadAction<IExercise>) => {
      const exercises = getExersises(state);

      const updatedExercises = [...exercises, action.payload];

      const trainingDayIdx = state.trainingDays.findIndex(
        day => day.date === state.activeDate,
      );

      if (trainingDayIdx !== -1) {
        state.trainingDays[trainingDayIdx].exercises = updatedExercises;

        return;
      }

      state.trainingDays = [
        ...state.trainingDays,
        {date: state.activeDate, exercises: updatedExercises},
      ];
    },
    updateExercise: (state, action: PayloadAction<IExercise>) => {
      const exercises = getExersises(state);

      const updatedExercises = exercises.map(exercise => {
        if (exercise.id === action.payload.id) return action.payload;

        return exercise;
      });

      state.trainingDays = state.trainingDays.map(day => {
        if (day.date === state.activeDate) {
          return {...day, exercises: updatedExercises};
        }

        return day;
      });
    },
    incrementSet: (state, action: PayloadAction<{id: string}>) => {
      const exercises = getExersises(state);

      const updatedExercises = exercises.map(exercise => {
        if (exercise.id === action.payload.id) {
          return {...exercise, setsDone: exercise.setsDone + 1};
        }

        return exercise;
      });

      state.trainingDays = state.trainingDays.map(day => {
        if (day.date === state.activeDate) {
          return {...day, exercises: updatedExercises};
        }

        return day;
      });
    },
    decrementSet: (state, action: PayloadAction<{id: string}>) => {
      const exercises = getExersises(state);

      const updatedExercises = exercises.map(exercise => {
        if (exercise.id === action.payload.id) {
          return {...exercise, setsDone: exercise.setsDone - 1};
        }

        return exercise;
      });

      state.trainingDays = state.trainingDays.map(day => {
        if (day.date === state.activeDate) {
          return {...day, exercises: updatedExercises};
        }

        return day;
      });
    },
  },
});

export const {
  changeActiveDate,
  addExercise,
  updateExercise,
  incrementSet,
  decrementSet,
  setTrainingDays,
} = trainingDaySlice.actions;
export default trainingDaySlice.reducer;
