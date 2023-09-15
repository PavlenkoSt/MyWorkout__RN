import {Realm} from '@realm/react';

import {RECORD_DB} from '../realm.constants';

export class Record extends Realm.Object {
  id!: string;
  name!: string;
  count!: number;
  units!: string;

  static schema = {
    name: RECORD_DB,
    properties: {
      id: 'string',
      name: 'string',
      count: 'int',
      units: 'string',
    },
    primaryKey: 'id',
  };
}
