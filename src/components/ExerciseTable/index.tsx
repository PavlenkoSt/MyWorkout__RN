import React, {FC} from 'react';
import {StyleProp, Text, View} from 'react-native';
import {
  EStyleSheet,
  ViewStyle,
} from 'react-native-extended-stylesheet-typescript';

import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';

interface IProps {
  exercise: IExercise;
  isCompleted: boolean;
  idx: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const ExerciseTable: FC<IProps> = ({
  exercise,
  idx,
  isCompleted,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.col}>
        <Text style={[styles.colText, isCompleted ? styles.textDone : void 0]}>
          {idx + 1}. {exercise.exercise}
        </Text>
      </View>
      <View style={[styles.col, styles.colCentered]}>
        <Text style={styles.colText}>
          {exercise.type === ExerciseTypeEnum.DYNAMIC ? 'Reps: ' : 'Hold: '}
        </Text>
        <Text style={styles.colText}>
          {exercise.reps}
          {exercise.type === ExerciseTypeEnum.STATIC ? ' sec.' : ''}
        </Text>
      </View>
      <View style={[styles.col, styles.colCentered]}>
        <Text style={styles.colText}>Sets:</Text>
        <Text style={styles.colText}>{exercise.sets}</Text>
      </View>
      <View style={[styles.col, styles.colCentered]}>
        <Text style={styles.colText}>Rest:</Text>
        <Text style={styles.colText}>{exercise.rest} sec.</Text>
      </View>
    </View>
  );
};

export default ExerciseTable;

const styles = EStyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#222',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
  },
  colCentered: {
    alignItems: 'center',
    flex: 0.6,
  },
  colText: {
    color: '$white',
  },
  textDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#ccc',
  },
});
