import {RootState} from '../index';

export const activeDateSelector = (state: RootState) =>
  state.trainingDay.activeDate;

export const trainingDateSelector = (state: RootState) =>
  state.trainingDay.trainingDay;
