import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import realm from '@app/db';
import {RECORDS_DB} from '@app/db/realm.constants';
import {setRecords} from '@app/store/slices/recordsSlice';
import {IRecord} from '@app/types/IRecord';

const useGetRecordsFromDB = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const records =
      (realm.objects(RECORDS_DB).toJSON() as unknown as IRecord[]) || [];

    dispatch(setRecords(records));
  }, []);
};

export default useGetRecordsFromDB;
