import {Realm} from '@realm/react';

import {GOALS_DB} from '../realm.constants';

export class Goal extends Realm.Object {
  id!: string;
  name!: string;
  count!: number;
  countArchived!: number;
  units!: string;

  static schema = {
    name: GOALS_DB,
    properties: {
      id: 'string',
      name: 'string',
      countArchived: 'int',
      count: 'int',
      units: 'string',
    },
    primaryKey: 'id',
  };
}
