import {RootState} from '../index';

export const activeDateSelector = (state: RootState) => {
  return state.trainingDay.activeDate;
};

export const trainingDateSelector = (state: RootState) => {
  return state.trainingDay.trainingDays.find(
    day => day.date === state.trainingDay.activeDate,
  );
};

export const exerciseSelector = (exerciseId: string) => (state: RootState) => {
  const trainingDay = trainingDateSelector(state);
  return trainingDay?.exercises.find(exercise => exercise.id === exerciseId);
};

export const allTrainingDaysSelector = (state: RootState) => {
  return state.trainingDay.trainingDays;
};
