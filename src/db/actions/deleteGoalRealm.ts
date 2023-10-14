import realm from '../index';

import {IGoal} from '@app/types/IGoal';
import {GOALS_DB} from '../realm.constants';

export const deleteGoalRealm = (goal: IGoal) => {
  realm.write(() => {
    try {
      const targetGoal = realm
        .objects(GOALS_DB)
        .find(value => value.toJSON().id === goal.id);

      if (!targetGoal) {
        console.error('Tried to delete goal, but not found in db', goal);
        return;
      }

      realm.delete(targetGoal);
    } catch (e) {
      console.error(e);
    }
  });
};
