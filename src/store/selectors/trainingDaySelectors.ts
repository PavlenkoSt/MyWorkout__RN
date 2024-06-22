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

export const nextExerciseSelector =
  (exerciseId: string) => (state: RootState) => {
    const trainingDay = trainingDateSelector(state);
    const idx = trainingDay?.exercises.findIndex(
      exercise => exercise.id === exerciseId,
    );

    if (idx === -1 || idx === void 0) return null;

    return trainingDay?.exercises[idx + 1] || null;
  };

export const allTrainingDaysSelector = (state: RootState) => {
  return state.trainingDay.trainingDays;
};
