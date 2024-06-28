import React, {FC, memo, useCallback, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaleDecorator} from 'react-native-draggable-flatlist';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SwipeableItem, {
  SwipeableItemImperativeRef,
} from 'react-native-swipeable-item';
import {useDispatch} from 'react-redux';

import ExerciseCounter from '@app/components/ExerciseCounter';
import ExerciseTable from '@app/components/ExerciseTable';
import ListUnderlayActions from '@app/components/ListUnderlayActions';
import {
  decrementSet,
  deleteExercise,
  incrementSet,
} from '@app/store/slices/trainingDaySlice';
import {
  ExerciseTypeEnum,
  IExercise,
  IExerciseWithId,
} from '@app/types/IExercise';
import {SWIPABLE_ITEM_CONFIG} from '@app/utilts/constants';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {TrainingRoutesStack} from '@app/navigation/types';

interface IProps {
  exercise: IExerciseWithId;
  idx: number;
  drag: () => void;
  actionPanelWidth: number;
  onChangeEditExersice: (exercise: IExercise) => void;
  isActive: boolean;
}

const Exercise: FC<IProps> = ({
  exercise,
  idx,
  drag,
  actionPanelWidth,
  onChangeEditExersice,
  isActive,
}) => {
  const itemRef = useRef<SwipeableItemImperativeRef>(null);

  const dispatch = useDispatch();

  const {navigate} = useTypedNavigation();

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

  const onItemPress = () => {
    if (exercise.type === ExerciseTypeEnum.WARMUP) return;

    itemRef.current?.close();
    navigate(TrainingRoutesStack.Exercise, {
      id: exercise.id,
      name: exercise.exercise,
    });
  };

  const renderUnderlayLeft = useCallback(
    (exercise: IExercise) => (
      <ListUnderlayActions
        onDeletePress={() => dispatch(deleteExercise({id: exercise.id}))}
        onEditPress={() => {
          itemRef.current?.close();
          onChangeEditExersice(exercise);
        }}
        actionPanelWidth={actionPanelWidth}
      />
    ),
    [],
  );

  return (
    <SwipeableItem
      key={exercise.id}
      ref={itemRef}
      item={exercise}
      swipeEnabled={!isActive}
      {...SWIPABLE_ITEM_CONFIG}
      renderUnderlayLeft={params => renderUnderlayLeft(exercise)}
      snapPointsLeft={[actionPanelWidth]}>
      <ScaleDecorator activeScale={0.9}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onItemPress}
          onLongPress={drag}
          style={styles.container}>
          <View style={styles.containerInner}>
            <ExerciseTable
              exercise={exercise}
              isCompleted={isCompleted}
              idx={idx}
              containerStyle={styles.tableContainer}
            />
            <ExerciseCounter
              canDecrease={canDecrease}
              decrement={decrement}
              increment={increment}
              isCompleted={isCompleted}
              doneCount={exercise.setsDone}
              doneGoalCount={exercise.sets}
            />
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    </SwipeableItem>
  );
};

export default memo(Exercise);

const styles = EStyleSheet.create({
  container: {
    padding: 5,
  },
  containerInner: {
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 16,
  },
  tableContainer: {
    borderTopEndRadius: 14,
    borderTopStartRadius: 14,
  },
});
