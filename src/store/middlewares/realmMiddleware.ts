import {Middleware} from '@reduxjs/toolkit';

import {TRAINING_DAY_DB} from '@app/db/realm.constants';
import {RootState} from '../index';
import realm from '@app/db';

const blackListActionTypes = [
  'trainingDay/setTrainingDays',
  'trainingDay/changeActiveDate',
];

const realmMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (blackListActionTypes.includes(action.type)) return result;

  const currentState = store.getState() as RootState;

  realm.write(() => {
    try {
      realm.deleteAll();

      currentState.trainingDay.trainingDays.forEach(day => {
        realm.create(TRAINING_DAY_DB, day, Realm.UpdateMode.All);
      });
    } catch (e) {
      console.log('realmMiddleware error', e);
    }
  });

  return result;
};

export default realmMiddleware;
