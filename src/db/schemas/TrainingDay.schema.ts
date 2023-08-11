import {Realm} from '@realm/react';

export class TrainingDay extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  date!: string;

  static schema = {
    name: 'TrainingDay',
    properties: {
      _id: 'objectId',
      date: 'string',
      exercises: {type: 'list', objectType: 'Exercise'},
    },
    primaryKey: '_id',
  };
}
