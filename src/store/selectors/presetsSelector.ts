import {RootState} from '../index';

export const presetsSelector = (state: RootState) => {
  return state.presets.presets;
};
