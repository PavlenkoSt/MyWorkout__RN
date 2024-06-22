import {useEffect, useRef, useState} from 'react';
import {IExerciseExecutionStageEnum} from './types';
import _BackgroundTimer from 'react-native-background-timer';
import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';
import {useDispatch, useSelector} from 'react-redux';
import {incrementSet} from '@app/store/slices/trainingDaySlice';
import {
  timeToRestSound,
  timeToWorkoutSound,
  timerSound,
} from '@app/utilts/sounds';
import {enableStartRestTimerAfterStaticExerciseSelector} from '@app/store/selectors/settingsSelector';

interface IProps {
  exercise?: IExercise;
  hasNextExercise: boolean;
}

export const useTimers = ({exercise, hasNextExercise}: IProps) => {
  const restTimerRef = useRef<number | null>(null);
  const exerciseTimerRef = useRef<number | null>(null);

  const enableStartRestTimerAfterStaticExercise = useSelector(
    enableStartRestTimerAfterStaticExerciseSelector,
  );

  const [restTime, setRestTime] = useState(0);
  const [holdTime, setHoldTime] = useState(0);

  const [canRest, setCanRest] = useState(false);

  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);
  const [isHoldExerciseTimerRunning, setIsHoldExerciseTimerRunning] =
    useState(false);

  const [shouldExecuteCurrentSet, setShouldExecuteCurrentSet] = useState(false);
  const [shouldStartStaticExerciseTimer, setShouldStartStaticExerciseTimer] =
    useState(false);

  const [stageStatus, setStageStatus] = useState(
    IExerciseExecutionStageEnum.None,
  );
  const canStartHoldExerciseTimer =
    exercise?.type === ExerciseTypeEnum.STATIC &&
    stageStatus !== IExerciseExecutionStageEnum.Resting &&
    exercise.setsDone < exercise.sets;

  const dispatch = useDispatch();

  const executeCurrentSet = ({
    shouldStartRestTimer,
  }: {
    shouldStartRestTimer: boolean;
  }) => {
    if (!exercise) return;

    if (exercise.setsDone >= exercise.sets) return;

    setStageStatus(IExerciseExecutionStageEnum.Resting);
    setCanRest(true);
    if (exercise) {
      setRestTime(exercise.rest);
    }

    timeToRestSound.play(() => {
      timerSound.play();
    });

    if (shouldStartRestTimer) {
      startRestTimer();
    }

    dispatch(incrementSet({id: exercise.id}));
  };

  const startRestTimer = () => {
    if (
      restTime <= 0 ||
      !exercise ||
      (!hasNextExercise && exercise.setsDone >= exercise.sets - 1)
    ) {
      return;
    }

    restTimerRef.current = _BackgroundTimer.setInterval(() => {
      setRestTime(prev => {
        if (prev <= 0) {
          if (restTimerRef.current) {
            _BackgroundTimer.clearInterval(restTimerRef.current);
          }
          setStageStatus(IExerciseExecutionStageEnum.Execution);
          setCanRest(false);
          setIsRestTimerRunning(false);
          setShouldStartStaticExerciseTimer(true);
          timeToWorkoutSound.play(() => {
            timerSound.play();
          });
          return exercise!.rest * 1000;
        } else {
          setIsRestTimerRunning(true);
          return prev - 100;
        }
      });
    }, 100);
  };

  const pauseRestTimer = () => {
    if (restTimerRef.current) {
      _BackgroundTimer.clearInterval(restTimerRef.current);
    }
    setIsRestTimerRunning(false);
  };

  const startExerciseTimer = () => {
    if (
      holdTime <= 0 ||
      !exercise ||
      exercise.type !== ExerciseTypeEnum.STATIC ||
      exercise.setsDone >= exercise.sets
    ) {
      return;
    }

    exerciseTimerRef.current = _BackgroundTimer.setInterval(() => {
      setHoldTime(prev => {
        if (prev <= 0) {
          _BackgroundTimer.clearInterval(exerciseTimerRef.current!);
          setShouldExecuteCurrentSet(true);
          return exercise!.reps * 1000;
        } else {
          setIsHoldExerciseTimerRunning(true);
          return prev - 100;
        }
      });
    }, 100);
  };

  const pauseExerciseTimer = () => {
    if (exerciseTimerRef.current) {
      _BackgroundTimer.clearInterval(exerciseTimerRef.current);
    }
    setIsHoldExerciseTimerRunning(false);
  };

  const skipRest = () => {
    if (restTimerRef.current) {
      _BackgroundTimer.clearInterval(restTimerRef.current);
    }
    setStageStatus(IExerciseExecutionStageEnum.Execution);
    setCanRest(false);
    setIsRestTimerRunning(false);
    setShouldStartStaticExerciseTimer(true);
    timeToWorkoutSound.play(() => {
      timerSound.play();
    });

    if (exercise) {
      setRestTime(exercise.rest * 1000);
    }
  };

  useEffect(() => {
    if (
      !shouldStartStaticExerciseTimer ||
      exercise?.type !== ExerciseTypeEnum.STATIC ||
      !enableStartRestTimerAfterStaticExercise
    ) {
      return;
    }
    startExerciseTimer();
    setShouldStartStaticExerciseTimer(false);
  }, [shouldStartStaticExerciseTimer]);

  useEffect(() => {
    if (!shouldExecuteCurrentSet) return;
    setIsHoldExerciseTimerRunning(false);
    executeCurrentSet({
      shouldStartRestTimer: enableStartRestTimerAfterStaticExercise,
    });
    setShouldExecuteCurrentSet(false);
  }, [shouldExecuteCurrentSet]);

  useEffect(() => {
    if (!exercise) return;
    setRestTime(exercise.rest * 1000);

    if (exercise.type !== ExerciseTypeEnum.STATIC) return;
    setHoldTime(exercise.reps * 1000);
  }, [exercise]);

  useEffect(() => {
    return () => {
      if (restTimerRef.current) {
        _BackgroundTimer.clearInterval(restTimerRef.current);
      }
      if (exerciseTimerRef.current) {
        _BackgroundTimer.clearInterval(exerciseTimerRef.current);
      }
    };
  }, []);

  return {
    restTime,
    holdTime,
    canRest,
    isRestTimerRunning,
    stageStatus,
    executeCurrentSet,
    startRestTimer,
    pauseRestTimer,
    startExerciseTimer,
    pauseExerciseTimer,
    skipRest,
    canStartHoldExerciseTimer,
    isHoldExerciseTimerRunning,
  };
};
