export enum ExerciseTypeEnum {
  DYNAMIC = 'dynamic',
  STATIC = 'static',
}

export interface IExercise {
  exercise: string;
  reps: number;
  sets: number;
  rest: number;
  type: ExerciseTypeEnum;
}
