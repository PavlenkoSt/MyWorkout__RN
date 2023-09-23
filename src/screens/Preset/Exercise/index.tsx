import React, {FC, useCallback, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaleDecorator} from 'react-native-draggable-flatlist';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SwipeableItem, {
  SwipeableItemImperativeRef,
} from 'react-native-swipeable-item';

import ExerciseTable from '@app/components/ExerciseTable';
import BtnGhost from '@app/components/UI-kit/BtnGhost';
import {IExercise} from '@app/types/IExercise';
import {
  DELETE_OPTION,
  SWIPABLE_ITEM_CONFIG,
  UPDATE_OPTION,
} from '@app/utilts/constants';

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
      <View style={styles.btns}>
        <BtnGhost
          color="orange"
          btnStyle={styles.btn}
          onPress={() => {
            itemRef.current?.close();
            onEditPress(exercise);
          }}>
          {UPDATE_OPTION}
        </BtnGhost>
        <BtnGhost
          color="red"
          btnStyle={styles.btn}
          onPress={() => onDeletePress(exercise)}>
          {DELETE_OPTION}
        </BtnGhost>
      </View>
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
  btns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    gap: BTN_OFFSET,
    paddingHorizontal: BTN_OFFSET,
  },
  btn: {
    width: BTN_WIDTH,
    paddingHorizontal: 0,
  },
});
