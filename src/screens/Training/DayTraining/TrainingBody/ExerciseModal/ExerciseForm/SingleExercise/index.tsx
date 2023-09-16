import {yupResolver} from '@hookform/resolvers/yup';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';

import FormItem from '@app/components/FormItem';
import Btn from '@app/components/UI-kit/Btn';
import useSaveFormFallback from '@app/hooks/useSaveFormFallback';
import {addExercise, updateExercise} from '@app/store/slices/trainingDaySlice';
import {ExerciseTypeEnum, IExerciseWithId} from '@app/types/IExercise';
import {DEFAULT_REST_SEC} from '@app/utilts/constants';
import {exerciseValidation} from '@app/validations/exercise.validation';
import {IExerciseBackup} from '../../index';

interface IForm {
  exercise: string;
  reps: number;
  sets: number;
  rest: number;
}

interface IProps {
  exerciseToEdit: IExerciseWithId | null;
  type: ExerciseTypeEnum;
  onAfterSubmit: () => void;
  exerciseBackup: IExerciseBackup | null;
  setExerciseBackup: Dispatch<SetStateAction<IExerciseBackup | null>>;
}

const SingleExercise: FC<IProps> = ({
  exerciseToEdit,
  type,
  onAfterSubmit,
  exerciseBackup,
  setExerciseBackup,
}) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(exerciseValidation),
    defaultValues: exerciseToEdit
      ? exerciseToEdit
      : {
          exercise: exerciseBackup?.exercise || '',
          rest: DEFAULT_REST_SEC,
        },
  });

  useSaveFormFallback<IForm>({watch, reset, setExerciseBackup});

  const onSubmit = (data: IForm) => {
    if (exerciseToEdit) {
      const {id, setsDone} = exerciseToEdit;

      dispatch(
        updateExercise({
          id,
          type,
          setsDone,
          ...data,
        }),
      );
    } else {
      dispatch(
        addExercise({...data, type, setsDone: 0, id: Date.now().toString()}),
      );
    }

    onAfterSubmit();
  };

  return (
    <View>
      <FormItem
        control={control}
        errors={errors}
        label="Exercise"
        name="exercise"
      />
      <View style={styles.formLine}>
        <FormItem
          control={control}
          errors={errors}
          label={type === ExerciseTypeEnum.DYNAMIC ? 'Reps' : 'Hold(sec)'}
          name="reps"
          keyboardType="numeric"
        />
        <FormItem
          control={control}
          errors={errors}
          label="Sets"
          name="sets"
          keyboardType="numeric"
        />
        <FormItem
          control={control}
          errors={errors}
          label="Rest(sec)"
          name="rest"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.btnContainer}>
        <Btn onPress={handleSubmit(onSubmit)}>
          {exerciseToEdit ? 'Save' : '+ Add'}
        </Btn>
      </View>
    </View>
  );
};

export default SingleExercise;

const styles = EStyleSheet.create({
  formLine: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 30,
  },
});
