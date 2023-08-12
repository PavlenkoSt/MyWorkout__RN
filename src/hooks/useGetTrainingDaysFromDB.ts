import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {TrainingDay} from '@app/db/schemas/TrainingDay.schema';
import {setTrainingDays} from '@app/store/slices/trainingDaySlice';
import {ITrainingDay} from '@app/types/ITrainingDay';
import useRealmContext from './useRealmContext';

const useGetTrainingDaysFromDB = () => {
  const dispatch = useDispatch();

  const {useQuery} = useRealmContext();

  const days = useQuery(TrainingDay);

  useEffect(() => {
    dispatch(setTrainingDays(days.toJSON() as unknown as ITrainingDay[]));
  }, [days]);
};

export default useGetTrainingDaysFromDB;
