import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';

import NoTrainingYet from './NoTrainingYet';
import TrainingBody from './TrainingBody';
import {exerciseConstructorService} from '@app/services/exerciseConstructor.service';
import {addExercise} from '@app/store/slices/trainingDaySlice';
import {v4} from 'uuid';
import {ExerciseTypeEnum} from '@app/types/IExercise';

const DayTraining: FC = () => {
  const trainingDay = useSelector(trainingDateSelector);

  const [isCreation, setIsCreation] = useState(false);

  const dispatch = useDispatch();

  const onStartPlanning = () => {
    const exercise = exerciseConstructorService.generateSimpleExercise(
      ExerciseTypeEnum.WARMUP,
    );
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
