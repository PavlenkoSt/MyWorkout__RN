import {IRecord} from '@app/types/IRecord';
import realm from '../index';

import {RECORDS_DB} from '../realm.constants';

export const syncRecordsRealm = (
  records: IRecord[],
  needDropBefore?: boolean,
) => {
  realm.write(() => {
    try {
      if (needDropBefore) {
        realm.delete(realm.objects(RECORDS_DB));
      }
      records.forEach(record => {
        realm.create(RECORDS_DB, record, Realm.UpdateMode.All);
      });
    } catch (e) {
      console.log('realmMiddleware syncRecordsRealm error', e);
    }
  });
};
