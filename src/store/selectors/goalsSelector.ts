import {RootState} from '../index';

export const goalsSelector = (state: RootState) => {
  return state.goals.goals;
};
