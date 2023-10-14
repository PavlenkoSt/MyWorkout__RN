import {IGoal} from '@app/types/IGoal';

import realm from '../index';
import {GOALS_DB} from '../realm.constants';

export const syncGoalsRealm = (goals: IGoal[]) => {
  realm.write(() => {
    try {
      goals.forEach(goal => {
        realm.create(GOALS_DB, goal, Realm.UpdateMode.All);
      });
    } catch (e) {
      console.log('realmMiddleware syncGoalsRealm error', e);
    }
  });
};
