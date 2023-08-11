import {useRealm} from '@realm/react';

import {ICreateTrainingDayDto} from '@app/types/dtos/TrainingDayDtos';

const useCreateTrainingDay = () => {
  const realm = useRealm();

  const createTrainingDay = (dto: ICreateTrainingDayDto) => {
    realm.write(() => {
      realm.create('TrainingDay', dto);
    });
  };

  return {createTrainingDay};
};

export default useCreateTrainingDay;
