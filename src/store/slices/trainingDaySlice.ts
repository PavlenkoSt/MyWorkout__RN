import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {deleteDayRealm} from '@app/db/actions/deleteDayRealm';
import {datesService} from '@app/services/dates.service';
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
    changeExercisesOrdering: (state, action: PayloadAction<IExercise[]>) => {
      state.trainingDays = state.trainingDays.map(day => {
        if (day.date === state.activeDate) {
          return {
            ...day,
            exercises: action.payload,
          };
        }

        return day;
      });
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
    addExercisesToDay: (
      state,
      action: PayloadAction<{date: string; exercises: IExercise[]}>,
    ) => {
      const existingExercises =
        state.trainingDays.find(day => day.date === action.payload.date)
          ?.exercises || [];

      const updatedExercises = [
        ...existingExercises,
        ...action.payload.exercises,
      ];

      const trainingDayIdx = state.trainingDays.findIndex(
        day => day.date === action.payload.date,
      );

      if (trainingDayIdx !== -1) {
        state.trainingDays[trainingDayIdx].exercises = updatedExercises;

        return;
      }

      state.trainingDays = [
        ...state.trainingDays,
        {date: action.payload.date, exercises: updatedExercises},
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
    deleteExercise: (state, action: PayloadAction<{id: string}>) => {
      const exercises = getExersises(state);

      const updatedExercises = exercises.filter(
        exercise => exercise.id !== action.payload.id,
      );

      if (!updatedExercises.length) {
        state.trainingDays = state.trainingDays.filter(day => {
          if (day.date === state.activeDate) {
            deleteDayRealm(day);
            return false;
          }
          return true;
        });
        return;
      }

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
  deleteExercise,
  changeExercisesOrdering,
  addExercisesToDay,
} = trainingDaySlice.actions;
export default trainingDaySlice.reducer;
