import React, {FC, memo, useCallback, useEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {useDispatch, useSelector} from 'react-redux';

import TrainingHeader from '@app/screens/Training/DayTraining/TrainingHeader';
import {
  activeDateSelector,
  trainingDateSelector,
} from '@app/store/selectors/trainingDaySelectors';
import {changeExercisesOrdering} from '@app/store/slices/trainingDaySlice';
import {IExercise, IExerciseWithId} from '@app/types/IExercise';

import Exercise from './Exercise';
import ExercisesFooter from './ExercisesFooter';

const ACTION_PANEL_WIDTH = 120;

interface IProps {
  onChangeEditExersice: (exercise: IExerciseWithId) => void;
  onAddExercisePress: () => void;
}

const SCROLL_VIEW_OFFSET = 250;

let currentDayToScroll: string | null = null;
let timer: NodeJS.Timeout | null = null;

const ExercisesList: FC<IProps> = ({
  onChangeEditExersice,
  onAddExercisePress,
}) => {
  const listRef = useRef<FlatList | null>(null);

  const dispatch = useDispatch();

  const trainingDay = useSelector(trainingDateSelector);
  const activeDate = useSelector(activeDateSelector);

  useEffect(() => {
    if (!activeDate) return;

    const canScroll = activeDate !== currentDayToScroll;

    if (!canScroll) {
      currentDayToScroll = activeDate;
      return;
    }

    const idxToScroll = trainingDay?.exercises.findIndex(
      ex => ex.sets > 0 && ex.sets !== ex.setsDone,
    );

    if (idxToScroll !== -1 && idxToScroll !== void 0) {
      listRef.current?.scrollToIndex({
        index: idxToScroll,
        animated: true,
        viewOffset: SCROLL_VIEW_OFFSET,
      });
    }

    currentDayToScroll = activeDate;
  }, [trainingDay?.exercises, activeDate]);

  useEffect(() => {
    return () => {
      currentDayToScroll = null;
    };
  }, []);

  const onScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: info.index,
          viewOffset: SCROLL_VIEW_OFFSET,
        });
      }, 300);
    },
    [],
  );

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
      ref={ref => (listRef.current = ref)}
      extraData={trainingDay?.exercises}
      data={trainingDay?.exercises || []}
      renderItem={renderItem}
      onScrollToIndexFailed={onScrollToIndexFailed}
      keyExtractor={item => item.id}
      onDragEnd={onDragEnd}
      keyboardShouldPersistTaps="always"
      ListHeaderComponent={TrainingHeader}
      ListFooterComponent={renderFooter}
    />
  );
};

export default memo(ExercisesList);
