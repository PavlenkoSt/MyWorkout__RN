import {Exercise} from './schemas/Exercise.schema';
import {TrainingDay} from './schemas/TrainingDay.schema';

const schemaVersion = 3;

const realmConfig: Realm.Configuration = {
  schema: [TrainingDay, Exercise],
  schemaVersion,
};

export default realmConfig;
