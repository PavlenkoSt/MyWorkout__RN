import React, {memo, useState} from 'react';
import {Text, View} from 'react-native';

import {IDateExercises} from '@/types/IDateExercises';

const AddTrainingDay = () => {
  const [exercises, setExercises] = useState<IDateExercises[]>([]);

  return (
    <View>
      <Text>AddTrainingDay</Text>
    </View>
  );
};

export default memo(AddTrainingDay);
