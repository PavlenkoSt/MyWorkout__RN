import {RootState} from '../index';

export const activeDateSelector = (state: RootState) => {
  return state.trainingDay.activeDate;
};

export const trainingDateSelector = (state: RootState) => {
  return state.trainingDay.trainingDays.find(
    day => day.date === state.trainingDay.activeDate,
  );
};
