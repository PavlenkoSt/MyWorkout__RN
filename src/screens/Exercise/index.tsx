import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import ScreenContainer from '@app/components/ScreenContainer';
import {
  exerciseSelector,
  nextExerciseSelector,
} from '@app/store/selectors/trainingDaySelectors';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';
import ExerciseDetail from './ExerciseDetail';
import TimersPanel from './TimersPanel';
import ActionPanel from './ActionPanel';
import ExerciseStage from './ExerciseStage';
import _BackgroundTimer from 'react-native-background-timer';
import {useTimers} from './useTimers';
import {IExerciseExecutionStageEnum} from './types';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {StackActions} from '@react-navigation/native';
import {TrainingRoutesStack} from '@app/navigation/types';
import SetsInfo from './SetsInfo';
import {ExerciseTypeEnum} from '@app/types/IExercise';

interface IProps {
  route: {
    params: {
      id: string;
      name: string;
    };
  };
}

export const Exercise: FC<IProps> = ({route}) => {
  const exerciseId = route.params.id;

  const exercise = useSelector(exerciseSelector(exerciseId));
  const nextExercise = useSelector(nextExerciseSelector(exerciseId));

  const {
    canRest,
    executeCurrentSet,
    holdTime,
    isRestTimerRunning,
    pauseExerciseTimer,
    pauseRestTimer,
    restTime,
    stageStatus,
    startExerciseTimer,
    startRestTimer,
    canStartHoldExerciseTimer,
    isHoldExerciseTimerRunning,
  } = useTimers({exercise, hasNextExercise: !!nextExercise});

  const {dispatch} = useTypedNavigation();

  const isDone = !!exercise && exercise.setsDone >= exercise.sets;
  const canMoveToNextExercise = !!nextExercise;

  const moveToNextExercise = () => {
    if (nextExercise) {
      dispatch(
        StackActions.replace(TrainingRoutesStack.Exercise, {
          id: nextExercise.id,
          name: nextExercise.exercise,
        }),
      );
    }
  };

  return (
    <ScreenContainer>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$primaryColor')}
        barStyle="light-content"
        height={0}
      />
      {!exercise ? (
        <Text style={styles.notFound}>Exercise not found</Text>
      ) : (
        <View style={styles.body}>
          <ExerciseDetail exercise={exercise} />
          <SetsInfo setsLeft={exercise.sets - exercise.setsDone} />
          <TimersPanel
            canRest={canRest}
            holdTime={holdTime}
            isRestTimerRunning={isRestTimerRunning}
            pauseExerciseTimer={pauseExerciseTimer}
            pauseRestTimer={pauseRestTimer}
            restTime={restTime}
            startExerciseTimer={startExerciseTimer}
            startRestTimer={startRestTimer}
            isTrainingDone={isDone && !nextExercise}
            canStartHoldExerciseTimer={canStartHoldExerciseTimer}
            isHoldExerciseTimerRunning={isHoldExerciseTimerRunning}
          />
          <ExerciseStage
            stageStatus={stageStatus}
            isDone={isDone}
            isTrainingDone={isDone && !nextExercise}
            setsDone={exercise.setsDone}
          />
          <ActionPanel
            canFinishCurrentSet={
              !isDone &&
              (stageStatus === IExerciseExecutionStageEnum.Execution ||
                stageStatus === IExerciseExecutionStageEnum.None) &&
              exercise.type !== ExerciseTypeEnum.STATIC
            }
            finishCurrentSet={executeCurrentSet}
            canMoveToNextExercise={canMoveToNextExercise}
            moveToNextExercise={moveToNextExercise}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  notFound: {
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingVertical: 30,
    fontSize: 16,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
