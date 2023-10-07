import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import realm from '@app/db';
import {TRAINING_DAY_DB} from '@app/db/realm.constants';
import {setTrainingDays} from '@app/store/slices/trainingDaySlice';
import {ITrainingDay} from '@app/types/ITrainingDay';

const useGetTrainingDaysFromDB = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const trainingDays =
      (realm.objects(TRAINING_DAY_DB).toJSON() as unknown as ITrainingDay[]) ||
      [];

    dispatch(setTrainingDays(trainingDays));
  }, []);
};

export default useGetTrainingDaysFromDB;
