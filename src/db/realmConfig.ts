import {Exercise} from './schemas/Exercise.schema';
import {TrainingDay} from './schemas/TrainingDay.schema';

const schemaVersion = 4;

const realmConfig: Realm.Configuration = {
  schema: [TrainingDay, Exercise],
  schemaVersion,
};

export default realmConfig;
