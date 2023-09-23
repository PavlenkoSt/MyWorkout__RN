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

export interface IExerciseBackup {
  exercise: string;
}

export interface ILadderExerciseForm {
  exercise: string;
  from: number;
  to: number;
  step: number;
  rest: number;
}

export interface IExerciseForm {
  exercise: string;
  reps: number;
  sets: number;
  rest: number;
}
