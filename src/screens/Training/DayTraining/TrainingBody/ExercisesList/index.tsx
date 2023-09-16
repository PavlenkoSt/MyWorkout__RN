import React, {FC, memo, useCallback} from 'react';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {useDispatch, useSelector} from 'react-redux';

import TrainingHeader from '@app/screens/Training/DayTraining/TrainingHeader';
import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {changeExercisesOrdering} from '@app/store/slices/trainingDaySlice';
import {IExercise, IExerciseWithId} from '@app/types/IExercise';

import Exercise from './Exercise';
import ExercisesFooter from './ExercisesFooter';

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
    () => <ExercisesFooter onAddExercisePress={onAddExercisePress} />,
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
          isActive={isActive}
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
