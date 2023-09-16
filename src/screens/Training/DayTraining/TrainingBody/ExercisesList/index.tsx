import React, {FC, memo, useCallback} from 'react';
import {View} from 'react-native';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import Btn from '@app/components/UI-kit/Btn';
import TrainingHeader from '@app/screens/Training/DayTraining/TrainingHeader';
import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {changeExercisesOrdering} from '@app/store/slices/trainingDaySlice';
import {IExercise, IExerciseWithId} from '@app/types/IExercise';

import Exercise from './Exercise';

const PADDING_HORIZONTAL = 5;
const ACTION_PANEL_WIDTH = 120;

interface IProps {
  onChangeEditExersice: (exercise: IExerciseWithId) => void;
  onAddExercisePress: () => void;
}

const ExercisesList: FC<IProps> = ({
  onChangeEditExersice,
  onAddExercisePress,
}) => {
  const dispatch = useDispatch();

  const trainingDay = useSelector(trainingDateSelector);

  const onDragEnd = useCallback(
    ({data, from, to}: DragEndParams<IExercise>) => {
      if (from === to) return;

      dispatch(changeExercisesOrdering(data));
    },
    [],
  );

  const renderFooter = useCallback(
    () => (
      <View style={styles.btnContainer}>
        <Btn onPress={onAddExercisePress}>+ Add exercise</Btn>
      </View>
    ),
    [],
  );

  const renderItem = useCallback(
    ({
      item: exercise,
      drag,
      isActive,
      getIndex,
    }: RenderItemParams<IExercise>) => {
      return (
        <Exercise
          actionPanelWidth={ACTION_PANEL_WIDTH}
          drag={drag}
          exercise={exercise}
          idx={getIndex() || 0}
          onChangeEditExersice={onChangeEditExersice}
        />
      );
    },
    [],
  );

  return (
    <DraggableFlatList
      extraData={trainingDay?.exercises}
      data={trainingDay?.exercises || []}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onDragEnd={onDragEnd}
      ListHeaderComponent={TrainingHeader}
      ListFooterComponent={renderFooter}
    />
  );
};

export default memo(ExercisesList);

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
});
