import {useEffect, useState} from 'react';

import {TrainingDay} from '@app/db/schemas/TrainingDay.schema';
import {ITrainingDay} from '@app/types/ITrainingDay';
import useRealmContext from './useRealmContext';

interface IProps {
  date: string;
}

const useGetTrainingDay = ({date}: IProps) => {
  const {useQuery} = useRealmContext();

  const days = useQuery(TrainingDay);

  const [trainingDay, setTrainingDay] = useState<ITrainingDay | null>(null);

  useEffect(() => {
    const result = days.filtered('date = $0', date);

    console.log('result', result);

    if (result.length) {
      setTrainingDay(result[0] as unknown as ITrainingDay);
      return;
    }

    setTrainingDay(null);
  }, [date]);

  return {trainingDay};
};

export default useGetTrainingDay;
