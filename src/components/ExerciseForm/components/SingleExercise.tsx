import {yupResolver} from '@hookform/resolvers/yup';
import React, {Dispatch, SetStateAction} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {ExerciseInput} from '@app/components/ExerciseInput';
import {FormItem} from '@app/components/FormItem';
import Btn from '@app/components/UI-kit/Btn';
import useSaveFormFallback from '@app/hooks/useSaveFormFallback';
import {
  ExerciseTypeEnum,
  IExerciseBackup,
  IExerciseForm,
  IExerciseWithId,
} from '@app/types/IExercise';
import {DEFAULT_REST_SEC} from '@app/utilts/constants';
import {exerciseValidation} from '@app/validations/exercise.validation';

interface IProps {
  exerciseToEdit: IExerciseWithId | null;
  type: ExerciseTypeEnum;
  exerciseBackup: IExerciseBackup | null;
  setExerciseBackup: Dispatch<SetStateAction<IExerciseBackup | null>>;
  onSubmit: (data: IExerciseForm, type: ExerciseTypeEnum) => void;
}

export default function SingleExercise({
  exerciseToEdit,
  type,
  exerciseBackup,
  setExerciseBackup,
  onSubmit,
}: IProps) {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<IExerciseForm>({
    resolver: yupResolver(exerciseValidation),
    defaultValues: exerciseToEdit
      ? exerciseToEdit
      : {
          exercise: exerciseBackup?.exercise || '',
          rest: DEFAULT_REST_SEC,
        },
  });

  useSaveFormFallback<IExerciseForm>({watch, reset, setExerciseBackup});

  const onSubmitWithData = (data: IExerciseForm) => onSubmit(data, type);

  return (
    <View>
      <FormItem
        control={control}
        errors={errors}
        label="Exercise"
        name="exercise"
        Component={ExerciseInput}
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
        <Btn onPress={handleSubmit(onSubmitWithData)}>
          {exerciseToEdit ? 'Save' : '+ Add'}
        </Btn>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  formLine: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
  },
});
