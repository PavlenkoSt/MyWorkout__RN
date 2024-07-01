import {ExerciseTypeEnum} from '@app/types/IExercise';

export const isSimpleExerciseType = (type: ExerciseTypeEnum) => {
  return [
    ExerciseTypeEnum.WARMUP,
    ExerciseTypeEnum.HANDBALANCE_SESSION,
    ExerciseTypeEnum.FLEXIBILITY_SESSION,
  ].includes(type as ExerciseTypeEnum);
};
