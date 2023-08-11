import React, {FC} from 'react';
import {View} from 'react-native';

import {IExerciseWithId} from '@app/types/IExercise';

import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Exercise from './Exercise';

interface IProps {
  exercises: IExerciseWithId[];
}

const ExercisesList: FC<IProps> = ({exercises}) => {
  return (
    <View style={styles.container}>
      {exercises.map((exercise, idx) => (
        <Exercise key={exercise.id} exercise={exercise} idx={idx} />
      ))}
    </View>
  );
};

export default ExercisesList;

const styles = EStyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
