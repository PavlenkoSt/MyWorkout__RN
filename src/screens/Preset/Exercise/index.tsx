import React, {FC, useCallback, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {ScaleDecorator} from 'react-native-draggable-flatlist';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SwipeableItem, {
  SwipeableItemImperativeRef,
} from 'react-native-swipeable-item';

import {ExerciseTable} from '@app/components/ExerciseTable';
import {ListUnderlayActions} from '@app/components/ListUnderlayActions';
import {IExercise} from '@app/types/IExercise';
import {SWIPABLE_ITEM_CONFIG} from '@app/utilts/constants';

interface IProps {
  exercise: IExercise;
  idx: number;
  isActive: boolean;
  drag: () => void;
  onEditPress: (exercise: IExercise) => void;
  onDeletePress: (exercise: IExercise) => void;
}

const BTN_WIDTH = 100;
const BTN_OFFSET = 5;
const SNAP_POINT = BTN_WIDTH * 2 + BTN_OFFSET * 3;

const Exercise: FC<IProps> = ({
  exercise,
  idx,
  isActive,
  drag,
  onEditPress,
  onDeletePress,
}) => {
  const itemRef = useRef<SwipeableItemImperativeRef | null>(null);

  const renderUnderlayLeft = useCallback((exercise: IExercise) => {
    return (
      <ListUnderlayActions
        onDeletePress={() => onDeletePress(exercise)}
        onEditPress={() => {
          itemRef.current?.close();
          onEditPress(exercise);
        }}
        actionPanelWidth={SNAP_POINT}
        inRow
      />
    );
  }, []);

  return (
    <SwipeableItem
      key={exercise.id}
      ref={itemRef}
      item={exercise}
      swipeEnabled={!isActive}
      {...SWIPABLE_ITEM_CONFIG}
      renderUnderlayLeft={params => renderUnderlayLeft(exercise)}
      snapPointsLeft={[SNAP_POINT]}>
      <ScaleDecorator activeScale={0.9}>
        <TouchableOpacity onLongPress={drag} activeOpacity={1}>
          <ExerciseTable
            exercise={exercise}
            isCompleted={false}
            idx={idx}
            containerStyle={styles.tableContainer}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    </SwipeableItem>
  );
};

export default Exercise;

const styles = EStyleSheet.create({
  tableContainer: {
    paddingVertical: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
});
