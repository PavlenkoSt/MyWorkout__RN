import realm from '../index';

import {TRAINING_DAY_DB} from '../realm.constants';

import {ITrainingDay} from '@app/types/ITrainingDay';

export const syncDaysRealm = (trainingDays: ITrainingDay[]) => {
  realm.write(() => {
    try {
      trainingDays.forEach(day => {
        realm.create(TRAINING_DAY_DB, day, Realm.UpdateMode.All);
      });
    } catch (e) {
      console.log('realmMiddleware syncDaysRealm error', e);
    }
  });
};
