import {Middleware} from '@reduxjs/toolkit';

import {syncDaysRealm} from '@app/db/actions/syncDaysRealm';

import {RootState} from '../index';

const blackListActionTypes = [
  'trainingDay/setTrainingDays',
  'trainingDay/changeActiveDate',
];

const realmMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (blackListActionTypes.includes(action.type)) return result;

  const currentState = store.getState() as RootState;

  syncDaysRealm(currentState.trainingDay.trainingDays);

  return result;
};

export default realmMiddleware;
