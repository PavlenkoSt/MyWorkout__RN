import {RootState} from '../index';

export const exerciseFromFallbackSelector = (state: RootState) => {
  return state.exerciseFormFallback.exercise;
};
