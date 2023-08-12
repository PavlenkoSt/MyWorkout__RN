import {ITrainingDayState} from '../slices/trainingDaySlice';

export const getExersises = (state: ITrainingDayState) => {
  return (
    state.trainingDays.find(day => day.date === state.activeDate)?.exercises ||
    []
  );
};
