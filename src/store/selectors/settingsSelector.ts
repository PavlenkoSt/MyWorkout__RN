import {RootState} from '../index';

export const enableAutocompleteSelector = (state: RootState) =>
  state.settings.exercisesForAutocomplete;

export const exercisesForAutocompleteSelector = (state: RootState) => {
  return state.settings.exercisesForAutocomplete;
};
