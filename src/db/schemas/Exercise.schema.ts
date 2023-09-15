import {ExerciseTypeEnum} from '@app/types/IExercise';

import {EXERCISE_DB} from '../realm.constants';

export class Exercise extends Realm.Object {
  id!: string;
  exercise!: string;
  reps!: number;
  sets!: number;
  rest!: number;
  type!: ExerciseTypeEnum;
  setsDone!: number;

  static schema = {
    name: EXERCISE_DB,
    embedded: true,
    properties: {
      id: 'string',
      exercise: 'string',
      reps: 'int',
      sets: 'int',
      rest: 'int',
      type: 'string',
      setsDone: {type: 'int', default: 0},
    },
  };
}
