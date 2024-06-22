import {useEffect, useRef, useState} from 'react';
import {IExerciseExecutionStageEnum} from './types';
import _BackgroundTimer from 'react-native-background-timer';
import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';
import {useDispatch} from 'react-redux';
import {incrementSet} from '@app/store/slices/trainingDaySlice';
import {timerSound} from '@app/utilts/sounds';

interface IProps {
  exercise?: IExercise;
  hasNextExercise: boolean;
}

export const useTimers = ({exercise, hasNextExercise}: IProps) => {
  const restTimerRef = useRef<number | null>(null);
  const exerciseTimerRef = useRef<number | null>(null);

  const [restTime, setRestTime] = useState(0);
  const [holdTime, setHoldTime] = useState(0);

  const [canRest, setCanRest] = useState(false);

  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);
  const [isHoldExerciseTimerRunning, setIsHoldExerciseTimerRunning] =
    useState(false);

  const [stageStatus, setStageStatus] = useState(
    IExerciseExecutionStageEnum.None,
  );
  const canStartHoldExerciseTimer =
    exercise?.type === ExerciseTypeEnum.STATIC &&
    stageStatus !== IExerciseExecutionStageEnum.Resting;

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

    dispatch(incrementSet({id: exercise.id}));
    if (shouldStartRestTimer) {
      startRestTimer();
    }
  };

  const startRestTimer = () => {
    if (restTime <= 0) return;

    restTimerRef.current = _BackgroundTimer.setInterval(() => {
      setRestTime(prev => {
        if (prev <= 0) {
          _BackgroundTimer.clearInterval(restTimerRef.current!);
          setStageStatus(IExerciseExecutionStageEnum.Execution);
          setCanRest(false);
          setIsRestTimerRunning(false);
          timerSound.play();
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
    if (holdTime <= 0) return;

    exerciseTimerRef.current = _BackgroundTimer.setInterval(() => {
      setHoldTime(prev => {
        if (prev <= 0) {
          _BackgroundTimer.clearInterval(exerciseTimerRef.current!);
          setIsHoldExerciseTimerRunning(false);
          executeCurrentSet({shouldStartRestTimer: false});
          timerSound.play();
          return exercise!.rest * 1000;
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
    canStartHoldExerciseTimer,
    isHoldExerciseTimerRunning,
  };
};
