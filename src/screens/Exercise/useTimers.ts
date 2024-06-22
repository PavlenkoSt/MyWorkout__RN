import {useEffect, useRef, useState} from 'react';
import {IExerciseExecutionStageEnum, IStage} from './types';
import _BackgroundTimer from 'react-native-background-timer';
import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';
import {useDispatch} from 'react-redux';
import {incrementSet} from '@app/store/slices/trainingDaySlice';
import {timerSound} from '@app/utilts/sounds';

interface IProps {
  exercise?: IExercise;
}

export const useTimers = ({exercise}: IProps) => {
  const restTimerRef = useRef<number | null>(null);
  const exerciseTimerRef = useRef<number | null>(null);

  const [restTime, setRestTime] = useState(0);
  const [holdTime, setHoldTime] = useState(0);

  const [canRest, setCanRest] = useState(false);

  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);

  const [stage, setStage] = useState<IStage>({
    set: 0,
    stage: IExerciseExecutionStageEnum.None,
  });

  const dispatch = useDispatch();

  const executeCurrentSet = () => {
    if (!exercise) return;

    if (exercise.setsDone >= exercise.sets) return;

    setStage(prev => {
      return {
        set: prev.set + 1,
        stage: IExerciseExecutionStageEnum.Resting,
      };
    });
    setCanRest(true);
    if (exercise) {
      setRestTime(exercise.rest);
    }

    dispatch(incrementSet({id: exercise.id}));
  };

  const startRestTimer = () => {
    if (restTime <= 0) return;

    restTimerRef.current = _BackgroundTimer.setInterval(() => {
      setRestTime(prev => {
        if (prev <= 0) {
          _BackgroundTimer.clearInterval(restTimerRef.current!);
          setStage(prev => {
            return {
              set: prev.set,
              stage: IExerciseExecutionStageEnum.Execution,
            };
          });
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

  const startExerciseTimer = () => {};

  const pauseExerciseTimer = () => {};

  useEffect(() => {
    setStage(prev => {
      return {...prev, set: exercise?.setsDone || 0};
    });

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
    stage,
    executeCurrentSet,
    startRestTimer,
    pauseRestTimer,
    startExerciseTimer,
    pauseExerciseTimer,
  };
};
