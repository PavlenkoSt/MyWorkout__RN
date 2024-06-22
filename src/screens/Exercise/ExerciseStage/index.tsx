import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {IExerciseExecutionStageEnum, IStage} from '../types';

interface IProps {
  stage: IStage;
  isDone: boolean;
  isTrainingDone: boolean;
}

const generateStageMessage = (
  stage: IStage,
  isDone: boolean,
  isTrainingDone: boolean,
) => {
  if (isTrainingDone) {
    return `Good job! Training has been finished!`;
  }

  if (stage.stage === IExerciseExecutionStageEnum.None) {
    if (isDone) {
      return `Exercise is done`;
    }
    return `Execution of ${stage.set + 1} set`;
  }
  if (stage.stage === IExerciseExecutionStageEnum.Resting) {
    if (isDone) {
      return `Resting before next exercise`;
    }
    return `Resting after ${stage.set} set`;
  }
  if (stage.stage === IExerciseExecutionStageEnum.Execution) {
    if (isDone) {
      return 'All sets has been executed';
    }
    return `Execution of ${stage.set} set`;
  }
};

const ExerciseStage: FC<IProps> = ({stage, isDone, isTrainingDone}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current stage:</Text>
      <Text style={styles.stage}>
        {generateStageMessage(stage, isDone, isTrainingDone)}
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
  },
  stage: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});
