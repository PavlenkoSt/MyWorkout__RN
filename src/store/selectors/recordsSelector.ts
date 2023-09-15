import {RootState} from '../index';

export const recordsSelector = (state: RootState) => {
  return state.records.records;
};
