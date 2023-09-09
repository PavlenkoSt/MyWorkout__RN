import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {setExerciseFallback} from '@app/store/slices/exerciseFormFallbackSlice';

interface IProps<T> {
  watch: (fields: keyof T) => any;
  reset: () => void;
}

interface IFormFieldsToFallback {
  exercise: string;
}

const useSaveFormFallback = <T extends IFormFieldsToFallback>({
  watch,
  reset,
}: IProps<T>) => {
  const dispatch = useDispatch();

  const exercise = watch('exercise');

  useEffect(() => {
    dispatch(setExerciseFallback(exercise));
  }, [exercise]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
};

export default useSaveFormFallback;
