import {useQuery} from '@realm/react';

import {TrainingDay} from '@app/db/schemas/TrainingDay.schema';

const useGetTrainingDay = () => {
  const days = useQuery(TrainingDay);

  const getTrainingDay = (date: string) => {
    const result = days.filtered('date = $0', date);

    if (result.length) {
      return result[0];
    }

    return null;
  };

  return {getTrainingDay};
};

export default useGetTrainingDay;
