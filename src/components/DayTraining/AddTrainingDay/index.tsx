import React, {memo, useState} from 'react';
import {Text, View} from 'react-native';

import {IDateExercises} from '@app/types/IDateExercises';
import AddExercise from '../AddExercise';

const AddTrainingDay = () => {
  const [exercises, setExercises] = useState<IDateExercises[]>([]);

  return (
    <View>
      <Text>AddTrainingDay</Text>
      <AddExercise />
    </View>
  );
};

export default memo(AddTrainingDay);
