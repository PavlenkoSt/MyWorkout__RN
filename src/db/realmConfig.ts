import {v4} from 'uuid';

import {Exercise} from './schemas/Exercise.schema';
import {Preset} from './schemas/Preset.schema';
import {Record} from './schemas/Record.schema';
import {TrainingDay} from './schemas/TrainingDay.schema';

const schemaVersion = 7;

const performMigration = (oldRealm: Realm, newRealm: Realm) => {
  if (oldRealm.schemaVersion < schemaVersion) {
    const oldObjects = oldRealm.objects(TrainingDay);
    const newObjects = newRealm.objects(TrainingDay);

    newObjects.forEach(day =>
      day.exercises.forEach(ex => {
        ex.id = v4();
      }),
    );

    return newObjects;
  }
};

const realmConfig: Realm.Configuration = {
  schema: [TrainingDay, Exercise, Record, Preset],
  schemaVersion,
  deleteRealmIfMigrationNeeded: __DEV__,
};

export default realmConfig;
