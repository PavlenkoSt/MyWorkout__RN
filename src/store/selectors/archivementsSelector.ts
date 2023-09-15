import {RootState} from '../index';

export const archivementsSelector = (state: RootState) => {
  console.log('state', state);

  return state.archivements.archivements;
};
