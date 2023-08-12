import React from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';

import Exercise from './Exercise';

const ExercisesList = () => {
  const trainingDay = useSelector(trainingDateSelector);

  return (
    <View style={styles.container}>
      {trainingDay?.exercises.map((exercise, idx) => (
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
