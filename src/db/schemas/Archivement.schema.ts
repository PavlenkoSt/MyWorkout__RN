import {Realm} from '@realm/react';

import {ARCHIVEMENT_DB} from '../realm.constants';

export class Archivement extends Realm.Object {
  id!: string;
  name!: string;
  count!: number;
  units!: string;

  static schema = {
    name: ARCHIVEMENT_DB,
    properties: {
      id: 'string',
      name: 'string',
      count: 'int',
      units: 'string',
    },
    primaryKey: 'id',
  };
}
