import RNFetchBlob from 'rn-fetch-blob';

import {IRecord} from '@app/types/IRecord';
import {DB_RECORDS_BACKUP_SAVED} from '@app/utilts/constants';
import realm from '../index';
import {RECORDS_DB} from '../realm.constants';
import {toastService} from '@app/services/toast.service';

const recordsBackup = async (records: IRecord[]) => {
  const string = JSON.stringify({trainingDays: [], records});

  const path =
    RNFetchBlob.fs.dirs.DownloadDir + '/WorkoutAppRecordsBackup.json';

  try {
    await RNFetchBlob.fs.unlink(path);
  } catch (e) {}

  try {
    await RNFetchBlob.fs.writeFile(path, string, 'utf8');
    toastService.success(DB_RECORDS_BACKUP_SAVED);
  } catch (e) {
    toastService.someError();
  }
};

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

      recordsBackup(records);
    }
  });
};
