import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';
import {WARMUP_TITLE} from './constants';

class ExerciseConstructor {
  generateWarmupExerciseBody = (): Omit<IExercise, 'id' | 'setsDone'> => {
    return {
      type: ExerciseTypeEnum.WARMUP,
      exercise: WARMUP_TITLE,
      reps: 1,
      rest: 0,
      sets: 1,
    };
  };
}

export const exerciseConstructor = new ExerciseConstructor();
