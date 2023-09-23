import {Realm} from '@realm/react';

import {IExercise} from '@app/types/IExercise';
import {EXERCISE_DB, PRESETS_DB} from '../realm.constants';

export class Preset extends Realm.Object {
  id!: string;
  exercises!: IExercise[];

  static schema = {
    name: PRESETS_DB,
    properties: {
      id: 'string',
      name: 'string',
      exercises: {type: 'list', objectType: EXERCISE_DB},
    },
    primaryKey: 'id',
  };
}
