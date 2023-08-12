import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {TRAINING_DAY_DB} from '@app/db/realm.constants';
import {TrainingDay} from '@app/db/schemas/TrainingDay.schema';
import {setTrainingDays} from '@app/store/slices/trainingDaySlice';
import {ITrainingDay} from '@app/types/ITrainingDay';
import useRealmContext, {realm} from './useRealmContext';

const useGetTrainingDaysFromDB = () => {
  const dispatch = useDispatch();

  const {useQuery} = useRealmContext();

  const days = useQuery(TrainingDay);

  useEffect(() => {
    const trainingDays =
      (realm.objects(TRAINING_DAY_DB).toJSON() as unknown as ITrainingDay[]) ||
      [];

    dispatch(setTrainingDays(trainingDays));
  }, [days]);
};

export default useGetTrainingDaysFromDB;
