import {Realm} from '@realm/react';

import {IExercise} from '@app/types/IExercise';
import {EXERCISE_DB, TRAINING_DAY_DB} from '../realm.constants';

export class TrainingDay extends Realm.Object {
  date!: string;
  exercises!: IExercise[];

  static schema = {
    name: TRAINING_DAY_DB,
    properties: {
      date: 'string',
      exercises: {type: 'list', objectType: EXERCISE_DB},
    },
    primaryKey: 'date',
  };
}
