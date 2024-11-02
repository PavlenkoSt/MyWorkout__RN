import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  exercise: IExercise;
}

const ExerciseDetail: FC<IProps> = ({exercise}) => {
  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Text style={styles.colText}>Sets:</Text>
        <Text style={styles.colText}>
          {exercise.setsDone}/{exercise.sets}
        </Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.colText}>Rest:</Text>
        <Text style={styles.colText}>{exercise.rest} sec.</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.colText}>
          {exercise.type === ExerciseTypeEnum.DYNAMIC ? 'Reps: ' : 'Hold: '}
        </Text>
        <Text style={styles.colText}>
          {exercise.reps}
          {exercise.type === ExerciseTypeEnum.STATIC ? ' sec.' : ''}
        </Text>
      </View>
    </View>
  );
};

export default ExerciseDetail;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colText: {
    color: '#fff',
  },
});
