import {yupResolver} from '@hookform/resolvers/yup';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import FormItem from '@app/components/FormItem';
import Btn from '@app/components/UI-kit/Btn';
import useSaveFormFallback from '@app/hooks/useSaveFormFallback';
import {activeDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {addExercisesToDay} from '@app/store/slices/trainingDaySlice';
import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';
import {DEFAULT_REST_SEC} from '@app/utilts/constants';
import showToast from '@app/utilts/showToast';
import {ladderExerciseValidation} from '@app/validations/ladder-exercise.validation';
import {IExerciseBackup} from '../../index';

interface IForm {
  exercise: string;
  from: number;
  to: number;
  step: number;
  rest: number;
}

interface IProps {
  onAfterSubmit: () => void;
  exerciseBackup: IExerciseBackup | null;
  setExerciseBackup: Dispatch<SetStateAction<IExerciseBackup | null>>;
}

const generateExercise = (data: IForm, i: number) => ({
  exercise: data.exercise,
  rest: data.rest,
  reps: i,
  sets: 1,
  type: ExerciseTypeEnum.DYNAMIC,
  setsDone: 0,
  id: Date.now().toString() + i,
});

const LadderExercise: FC<IProps> = ({
  onAfterSubmit,
  exerciseBackup,
  setExerciseBackup,
}) => {
  const dispatch = useDispatch();

  const activeDate = useSelector(activeDateSelector);

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(ladderExerciseValidation),
    defaultValues: {
      step: 1,
      exercise: exerciseBackup?.exercise || '',
      rest: DEFAULT_REST_SEC,
    },
  });

  useSaveFormFallback<IForm>({watch, reset, setExerciseBackup});

  const onSubmit = (data: IForm) => {
    const {from, to, step} = data;

    if (from === to) {
      return showToast.error('"From" and "To" cannot be equal');
    }

    const exercisesToCreate: IExercise[] = [];

    const fromLessThanTo = from < to;

    if (fromLessThanTo) {
      for (let i = from; i <= to; i += step) {
        exercisesToCreate.push(generateExercise(data, i));
      }
    } else {
      for (let i = from; i >= to; i -= step) {
        exercisesToCreate.push(generateExercise(data, i));
      }
    }

    if (!exercisesToCreate.length || exercisesToCreate.length === 1) {
      return showToast.error('No exercises is generated, check on your step');
    }

    dispatch(
      addExercisesToDay({date: activeDate, exercises: exercisesToCreate}),
    );

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
    marginTop: 30,
  },
});
