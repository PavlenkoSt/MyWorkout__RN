import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import Btn from '@app/components/UI-kit/Btn';
import Dropdown from '@app/components/UI-kit/Dropdown';
import Input from '@app/components/UI-kit/Input';
import {ExerciseTypeEnum} from '@app/types/IExercise';
import {exerciseValidation} from '@app/validations/exercise.validation';

interface IForm {
  exercise: string;
  reps: number;
  sets: number;
  rest: number;
}

const AddExercise = () => {
  const [type, setType] = useState(ExerciseTypeEnum.DYNAMIC);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IForm>({
    resolver: yupResolver(exerciseValidation),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formItem}>
        <Text style={styles.title}>Exercise</Text>
        <Controller
          control={control}
          render={({field}) => (
            <Input value={field.value} onChangeText={field.onChange} />
          )}
          name="exercise"
        />
        {!!errors.exercise && (
          <Text style={styles.error}>{errors.exercise.message}</Text>
        )}
      </View>

      <View style={styles.formLine}>
        <View style={styles.formItem}>
          <Text style={styles.title}>
            {type === ExerciseTypeEnum.DYNAMIC ? 'Reps' : 'Hold(sec)'}
          </Text>
          <Controller
            control={control}
            render={({field}) => (
              <Input
                value={String(field.value || '')}
                keyboardType="numeric"
                onChangeText={field.onChange}
              />
            )}
            name="reps"
          />
          {!!errors.reps && (
            <Text style={styles.error}>{errors.reps.message}</Text>
          )}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.title}>Sets</Text>
          <Controller
            control={control}
            render={({field}) => (
              <Input
                value={String(field.value || '')}
                keyboardType="numeric"
                onChangeText={field.onChange}
              />
            )}
            name="sets"
          />
          {!!errors.sets && (
            <Text style={styles.error}>{errors.sets.message}</Text>
          )}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.title}>Rest(sec)</Text>
          <Controller
            control={control}
            render={({field}) => (
              <Input
                value={String(field.value || '')}
                keyboardType="numeric"
                onChangeText={field.onChange}
              />
            )}
            name="rest"
          />
          {!!errors.rest && (
            <Text style={styles.error}>{errors.rest.message}</Text>
          )}
        </View>
      </View>

      <View style={[styles.formItem, {marginBottom: 20}]}>
        <Text style={styles.title}>Type</Text>
        <Dropdown
          data={[ExerciseTypeEnum.DYNAMIC, ExerciseTypeEnum.STATIC]}
          defaultValue={ExerciseTypeEnum.DYNAMIC}
          onSelect={value => setType(value)}
        />
      </View>

      <Btn onPress={handleSubmit(onSubmit)}>Add</Btn>
    </View>
  );
};

export default AddExercise;

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: '#333',
  },
  formLine: {
    flexDirection: 'row',
    gap: 10,
  },
  formItem: {
    marginBottom: 10,
    flex: 1,
  },
  title: {
    marginBottom: 5,
  },
  error: {
    marginTop: 2,
    color: 'red',
    fontSize: 10,
  },
});
