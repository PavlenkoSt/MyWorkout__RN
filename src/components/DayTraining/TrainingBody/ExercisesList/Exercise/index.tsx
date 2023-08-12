import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';

import CompletedCircleIcon from '@app/components/Icons/CompletedCircleIcon';
import {decrementSet, incrementSet} from '@app/store/slices/trainingDaySlice';
import {ExerciseTypeEnum, IExerciseWithId} from '@app/types/IExercise';
import ExerciseContext from './ExerciseContext';

interface IProps {
  exercise: IExerciseWithId;
  idx: number;
  onChangeEditExersice: (exercise: IExerciseWithId) => void;
}

const Exercise: FC<IProps> = ({exercise, idx, onChangeEditExersice}) => {
  const dispatch = useDispatch();

  const canDecrease = exercise.setsDone > 0;
  const isCompleted = exercise.setsDone >= exercise.sets;

  const increment = () => {
    if (isCompleted) return;

    dispatch(incrementSet({id: exercise.id}));
  };

  const decrement = () => {
    if (!canDecrease) return;

    dispatch(decrementSet({id: exercise.id}));
  };

  return (
    <ExerciseContext
      exerciseId={exercise.id}
      onChangeEditExersice={() => onChangeEditExersice(exercise)}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.col}>
            <Text style={isCompleted ? styles.textDone : void 0}>
              {idx + 1}. {exercise.exercise}
            </Text>
          </View>
          <View style={[styles.col, styles.colCentered]}>
            <Text>
              {exercise.type === ExerciseTypeEnum.DYNAMIC ? 'Reps: ' : 'Hold: '}
            </Text>
            <Text>
              {exercise.reps}
              {exercise.type === ExerciseTypeEnum.STATIC ? ' sec.' : ''}
            </Text>
          </View>
          <View style={[styles.col, styles.colCentered]}>
            <Text>Sets:</Text>
            <Text>{exercise.sets}</Text>
          </View>
          <View style={[styles.col, styles.colCentered]}>
            <Text>Rest:</Text>
            <Text>{exercise.rest} sec.</Text>
          </View>
        </View>
        <View style={styles.bot}>
          <TouchableOpacity
            onLongPress={e => e.stopPropagation()}
            onPress={decrement}
            style={[
              styles.btn,
              {borderBottomLeftRadius: 15, opacity: canDecrease ? 1 : 0.3},
            ]}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <View style={styles.score}>
            <Text style={styles.scoreText}>
              {exercise.setsDone} / {exercise.sets}
            </Text>
            {isCompleted && (
              <View style={styles.completed}>
                <CompletedCircleIcon width={20} height={20} />
              </View>
            )}
          </View>
          <TouchableOpacity
            onLongPress={e => e.stopPropagation()}
            onPress={increment}
            style={[
              styles.btn,
              {borderBottomRightRadius: 15, opacity: !isCompleted ? 1 : 0.3},
            ]}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ExerciseContext>
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
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
  },
  colCentered: {
    alignItems: 'center',
  },
  colText: {
    textAlign: 'center',
  },
  textDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#ccc',
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
  completed: {
    position: 'absolute',
    bottom: -15,
    right: -5,
    zIndex: 1,
  },
});
