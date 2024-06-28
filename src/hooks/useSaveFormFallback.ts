import {IExerciseBackup} from '@app/types/IExercise';
import {Dispatch, SetStateAction, useEffect} from 'react';

interface IProps<T> {
  watch: (fields: keyof T) => any;
  reset: () => void;
  setExerciseBackup: Dispatch<SetStateAction<IExerciseBackup | null>>;
}

interface IFormFieldsToFallback {
  exercise: string;
}

const useSaveFormFallback = <T extends IFormFieldsToFallback>({
  watch,
  reset,
  setExerciseBackup,
}: IProps<T>) => {
  const exercise = watch('exercise');

  useEffect(() => {
    setExerciseBackup({exercise});
  }, [exercise]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
};

export default useSaveFormFallback;
