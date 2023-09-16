import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';

interface IProps {
  exercise: IExercise;
  isCompleted: boolean;
  idx: number;
}

const ExTable: FC<IProps> = ({exercise, idx, isCompleted}) => {
  return (
    <View style={styles.container}>
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

export default ExTable;

const styles = EStyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#222',
    justifyContent: 'space-between',
    paddingRight: 15,
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
