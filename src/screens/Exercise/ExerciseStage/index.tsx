import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {IExerciseExecutionStageEnum} from '../types';
import {ColorVars} from '@app/utilts/theme';

interface IProps {
  stageStatus: IExerciseExecutionStageEnum;
  isDone: boolean;
  isTrainingDone: boolean;
  setsDone: number;
}

const generateStageMessage = ({
  setsDone,
  isDone,
  isTrainingDone,
  stageStatus,
}: {
  stageStatus: IExerciseExecutionStageEnum;
  isDone: boolean;
  isTrainingDone: boolean;
  setsDone: number;
}) => {
  if (isTrainingDone) {
    return `Good job! Training has been finished!`;
  }

  if (stageStatus === IExerciseExecutionStageEnum.None) {
    if (isDone) {
      return `Exercise is done`;
    }
    return `Execution of ${setsDone + 1} set`;
  }
  if (stageStatus === IExerciseExecutionStageEnum.Resting) {
    if (isDone) {
      return `Resting before next exercise`;
    }
    return `Resting after ${setsDone} set`;
  }
  if (stageStatus === IExerciseExecutionStageEnum.Execution) {
    if (isDone) {
      return 'All sets has been executed';
    }
    return `Execution of ${setsDone + 1} set`;
  }
};

const ExerciseStage: FC<IProps> = ({
  stageStatus,
  isDone,
  isTrainingDone,
  setsDone,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current stage:</Text>
      <Text style={styles.stage}>
        {generateStageMessage({
          stageStatus,
          isDone,
          isTrainingDone,
          setsDone,
        })}
      </Text>
    </View>
  );
};

export default ExerciseStage;

const styles = EStyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: ColorVars.$white,
  },
  stage: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});
