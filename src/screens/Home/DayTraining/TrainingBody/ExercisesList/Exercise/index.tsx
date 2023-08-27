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
    <View style={styles.container}>
      <View>
        <View style={styles.top}>
          <View style={styles.col}>
            <Text
              style={[styles.colText, isCompleted ? styles.textDone : void 0]}>
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
          <View style={styles.contextMenuContainer}>
            <ExerciseContext
              exerciseId={exercise.id}
              onChangeEditExersice={() => onChangeEditExersice(exercise)}>
              <Text style={styles.contextMenuMark}>⋮</Text>
            </ExerciseContext>
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
    </View>
  );
};

export default Exercise;

const styles = EStyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 16,
  },
  top: {
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
  },
  colText: {
    color: '$white',
  },
  contextMenuContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  contextMenuMark: {
    fontSize: 25,
    width: 15,
    textAlign: 'center',
    color: '$white',
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
    color: '$white',
  },
  completed: {
    position: 'absolute',
    bottom: -15,
    right: -5,
    zIndex: 1,
  },
});
