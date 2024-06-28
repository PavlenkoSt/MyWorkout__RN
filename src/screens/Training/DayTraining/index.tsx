import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';

import NoTrainingYet from './NoTrainingYet';
import TrainingBody from './TrainingBody';
import {exerciseConstructor} from '@app/utilts/exerciseConstructor';
import {addExercise} from '@app/store/slices/trainingDaySlice';
import {v4} from 'uuid';

const DayTraining: FC = () => {
  const trainingDay = useSelector(trainingDateSelector);

  const [isCreation, setIsCreation] = useState(false);

  const dispatch = useDispatch();

  const onStartPlanning = () => {
    const exercise = exerciseConstructor.generateWarmupExerciseBody();
    dispatch(
      addExercise({
        ...exercise,
        setsDone: 0,
        id: v4(),
      }),
    );

    setIsCreation(true);
  };

  return (
    <View style={styles.container}>
      {!trainingDay && !isCreation ? (
        <NoTrainingYet onStartPlanning={onStartPlanning} />
      ) : (
        <TrainingBody isCreation={isCreation} />
      )}
    </View>
  );
};

export default DayTraining;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});
