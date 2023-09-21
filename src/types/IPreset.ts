import {IExercise} from './IExercise';

export interface IPreset {
  id: string;
  name: string;
  exercises: IExercise[];
}
