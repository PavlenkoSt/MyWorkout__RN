export enum IExerciseExecutionStageEnum {
  None = 'None',
  Execution = 'Execution',
  Resting = 'Resting',
}

export interface IStage {
  stage: IExerciseExecutionStageEnum;
  set: number;
}
