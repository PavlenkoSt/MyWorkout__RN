import realm from '../index';

import {IRecord} from '@app/types/IRecord';
import {RECORDS_DB} from '../realm.constants';

export const deleteRecordRealm = (record: IRecord) => {
  realm.write(() => {
    try {
      const targetReocord = realm
        .objects(RECORDS_DB)
        .find(value => value.toJSON().id === record.id);

      if (!targetReocord) {
        console.error('Tried to delete record, but not found in db', record);
        return;
      }

      realm.delete(targetReocord);
    } catch (e) {
      console.error(e);
    }
  });
};
