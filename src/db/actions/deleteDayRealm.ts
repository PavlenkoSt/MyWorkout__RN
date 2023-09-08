import realm from '../index';

import {ITrainingDay} from '@app/types/ITrainingDay';
import {TRAINING_DAY_DB} from '../realm.constants';

export const deleteDayRealm = (day: ITrainingDay) => {
  realm.write(() => {
    try {
      const targetDay = realm
        .objects(TRAINING_DAY_DB)
        .find(value => value.toJSON().date === day.date);

      if (!targetDay) {
        console.error('Tried to delete day, but not found in db', day);
        return;
      }

      realm.delete(targetDay);
    } catch (e) {
      console.error(e);
    }
  });
};
