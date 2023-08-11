import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {ExerciseTypeEnum, IExerciseWithId} from '@app/types/IExercise';

interface IProps {
  exercise: IExerciseWithId;
  idx: number;
}

const Exercise: FC<IProps> = ({exercise, idx}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.col}>
          <Text>
            {idx + 1}. {exercise.exercise}
          </Text>
        </View>
        <View style={styles.col}>
          <Text>
            {exercise.type === ExerciseTypeEnum.DYNAMIC ? 'Reps: ' : 'Hold: '}
            {exercise.reps}
            {exercise.type === ExerciseTypeEnum.STATIC ? ' sec.' : ''}
          </Text>
        </View>
        <View style={styles.col}>
          <Text>Sets: {exercise.sets}</Text>
        </View>
        <View style={styles.col}>
          <Text>Rest: {exercise.rest} sec.</Text>
        </View>
      </View>
      <View style={styles.bot}>
        <TouchableOpacity style={[styles.btn, {borderBottomLeftRadius: 15}]}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <View style={styles.score}>
          <Text style={styles.scoreText}>1 / {exercise.sets}</Text>
        </View>
        <TouchableOpacity style={[styles.btn, {borderBottomRightRadius: 15}]}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Exercise;

const styles = EStyleSheet.create({
  container: {
    marginBottom: 10,
  },
  top: {
    padding: 5,
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#222',
  },
  col: {
    flex: 1,
  },
  bot: {
    backgroundColor: '#112b40',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '$primaryColor',
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  btnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  score: {
    paddingHorizontal: 15,
  },
  scoreText: {
    fontWeight: '700',
  },
});
