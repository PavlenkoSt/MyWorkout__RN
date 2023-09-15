export interface IRecord {
  id: string;
  name: string;
  count: number;
  units: string;
}

export enum RecordUnitsEnum {
  REPS = 'Reps',
  SEC = 'Sec',
  MIN = 'Min',
}
