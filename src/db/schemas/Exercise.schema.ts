import {ExerciseTypeEnum} from '@app/types/IExercise';

export class Exercise extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  exercise!: string;
  reps!: number;
  sets!: number;
  rest!: number;
  type!: ExerciseTypeEnum;

  static schema = {
    name: 'Exercise',
    properties: {
      _id: 'objectId',
      exercise: 'string',
      reps: 'int',
      sets: 'int',
      rest: 'int',
      type: 'string',
    },
    primaryKey: '_id',
  };
}
