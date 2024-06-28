import {yupResolver} from '@hookform/resolvers/yup';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import ExerciseInput from '@app/components/ExerciseInput';
import FormItem from '@app/components/FormItem';
import Btn from '@app/components/UI-kit/Btn';
import useSaveFormFallback from '@app/hooks/useSaveFormFallback';
import {IExerciseBackup, ILadderExerciseForm} from '@app/types/IExercise';
import {DEFAULT_REST_SEC} from '@app/utilts/constants';
import {ladderExerciseValidation} from '@app/validations/ladder-exercise.validation';

interface IProps {
  exerciseBackup: IExerciseBackup | null;
  setExerciseBackup: Dispatch<SetStateAction<IExerciseBackup | null>>;
  onSubmit: (data: ILadderExerciseForm) => void;
}

const LadderExercise: FC<IProps> = ({
  exerciseBackup,
  setExerciseBackup,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<ILadderExerciseForm>({
    resolver: yupResolver(ladderExerciseValidation),
    defaultValues: {
      step: 1,
      exercise: exerciseBackup?.exercise || '',
      rest: DEFAULT_REST_SEC,
    },
  });

  useSaveFormFallback<ILadderExerciseForm>({watch, reset, setExerciseBackup});

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
          label="From"
          name="from"
          keyboardType="numeric"
        />
        <FormItem
          control={control}
          errors={errors}
          label="To"
          name="to"
          keyboardType="numeric"
        />
        <FormItem
          control={control}
          errors={errors}
          label="Step"
          name="step"
          keyboardType="numeric"
        />
        <FormItem
          control={control}
          errors={errors}
          label="Rest"
          name="rest"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.btnContainer}>
        <Btn onPress={handleSubmit(onSubmit)}>+ Add</Btn>
      </View>
    </View>
  );
};

export default LadderExercise;

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
