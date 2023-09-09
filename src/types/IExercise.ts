export enum ExerciseTypeEnum {
  DYNAMIC = 'Dynamic',
  STATIC = 'Static',
  LADDER = 'Ladder',
}

export interface IExercise {
  exercise: string;
  reps: number;
  sets: number;
  setsDone: number;
  rest: number;
  type: ExerciseTypeEnum;
  id: string;
}

export interface IExerciseWithId extends IExercise {
  id: string;
}
