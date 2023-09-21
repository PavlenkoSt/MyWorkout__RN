import {Realm} from '@realm/react';

import {IExercise} from '@app/types/IExercise';
import {EXERCISE_DB, PRESET_DB} from '../realm.constants';

export class Preset extends Realm.Object {
  id!: string;
  exercises!: IExercise[];

  static schema = {
    name: PRESET_DB,
    properties: {
      id: 'string',
      name: 'string',
      exercises: {type: 'list', objectType: EXERCISE_DB},
    },
    primaryKey: 'id',
  };
}
