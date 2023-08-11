export enum ExerciseTypeEnum {
  DYNAMIC = 'Dynamic',
  STATIC = 'Static',
}

export interface IExercise {
  exercise: string;
  reps: number;
  sets: number;
  rest: number;
  type: ExerciseTypeEnum;
}

export interface IExerciseWithId extends IExercise {
  id: string;
}
