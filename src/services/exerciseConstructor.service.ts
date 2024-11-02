import {
  ExerciseTypeEnum,
  IExercise,
  ILadderExerciseForm,
} from '@app/types/IExercise';
import {
  TITLE_FLEXIBILITY,
  TITLE_HANDBALANCE,
  TITLE_WARMUP,
} from '../utilts/constants';
import {v4} from 'uuid';

type SimpleExerciseResult = Omit<IExercise, 'id' | 'setsDone'>;

export type SimpleExerciseType =
  | ExerciseTypeEnum.WARMUP
  | ExerciseTypeEnum.HANDBALANCE_SESSION
  | ExerciseTypeEnum.FLEXIBILITY_SESSION;

class ExerciseConstructorService {
  private generateWarmupExerciseBody = (): SimpleExerciseResult => {
    return {
      type: ExerciseTypeEnum.WARMUP,
      exercise: TITLE_WARMUP,
      reps: 1,
      rest: 0,
      sets: 1,
    };
  };
  private generateFlexibilityExerciseBody = (): SimpleExerciseResult => {
    return {
      type: ExerciseTypeEnum.FLEXIBILITY_SESSION,
      exercise: TITLE_FLEXIBILITY,
      reps: 1,
      rest: 0,
      sets: 1,
    };
  };
  private generateHandbalanceExerciseBody = (): SimpleExerciseResult => {
    return {
      type: ExerciseTypeEnum.HANDBALANCE_SESSION,
      exercise: TITLE_HANDBALANCE,
      reps: 1,
      rest: 0,
      sets: 1,
    };
  };
  private createExercise = (data: ILadderExerciseForm, i: number) => ({
    exercise: data.exercise.trim(),
    rest: data.rest,
    reps: i,
    sets: 1,
    type: ExerciseTypeEnum.DYNAMIC,
    setsDone: 0,
    id: v4(),
  });

  generateSimpleExercise = (type: SimpleExerciseType): SimpleExerciseResult => {
    switch (type) {
      case ExerciseTypeEnum.WARMUP:
        return this.generateWarmupExerciseBody();
      case ExerciseTypeEnum.FLEXIBILITY_SESSION:
        return this.generateFlexibilityExerciseBody();
      case ExerciseTypeEnum.HANDBALANCE_SESSION:
        return this.generateHandbalanceExerciseBody();
      default:
        throw new Error('generateSimpleExercise error');
    }
  };

  generateLadderExercises = (
    data: ILadderExerciseForm,
  ): Promise<IExercise[]> => {
    const {from, to, step} = data;

    if (from === to) {
      return Promise.reject('"From" and "To" cannot be equal');
    }

    const exercisesToCreate: IExercise[] = [];

    const fromLessThanTo = from < to;

    if (fromLessThanTo) {
      for (let i = from; i <= to; i += step) {
        exercisesToCreate.push(this.createExercise(data, i));
      }
    } else {
      for (let i = from; i >= to; i -= step) {
        exercisesToCreate.push(this.createExercise(data, i));
      }
    }

    if (!exercisesToCreate.length || exercisesToCreate.length === 1) {
      return Promise.reject('No exercises is generated, check on your step');
    }

    return Promise.resolve(exercisesToCreate);
  };

  isSimpleExerciseType = (type: ExerciseTypeEnum) => {
    return [
      ExerciseTypeEnum.WARMUP,
      ExerciseTypeEnum.HANDBALANCE_SESSION,
      ExerciseTypeEnum.FLEXIBILITY_SESSION,
    ].includes(type as ExerciseTypeEnum);
  };
}

export const exerciseConstructorService = new ExerciseConstructorService();
