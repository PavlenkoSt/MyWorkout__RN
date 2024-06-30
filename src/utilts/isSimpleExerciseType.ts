import {ExerciseTypeEnum} from '@app/types/IExercise';

export const isSimpleExerciseType = (type: ExerciseTypeEnum) => {
  return Object.values(ExerciseTypeEnum).includes(type as ExerciseTypeEnum);
};
