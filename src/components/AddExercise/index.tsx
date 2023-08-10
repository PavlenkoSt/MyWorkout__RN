import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';

import Btn from '../UI-kit/Btn';

const AddExercise = () => {
  const {control, handleSubmit} = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View>
      <View>
        <Text>Exercise</Text>
        <Controller
          control={control}
          render={({field}) => (
            <TextInput
              placeholder="Exercise"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
          name="exercise"
        />
      </View>

      <View>
        <Text>Reps</Text>
        <Controller
          control={control}
          render={({field}) => (
            <TextInput
              placeholder="Reps"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
          name="reps"
        />
      </View>

      <View>
        <Text>Sets</Text>
        <Controller
          control={control}
          render={({field}) => (
            <TextInput
              placeholder="Sets"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
          name="sets"
        />
      </View>

      <View>
        <Text>Rest</Text>
        <Controller
          control={control}
          render={({field}) => (
            <TextInput
              placeholder="Rest"
              value={field.value}
              keyboardType="numeric"
              onChangeText={field.onChange}
            />
          )}
          name="rest"
        />
      </View>

      {/* <TextInput
        placeholder="Type"
        value={item.type}
        onChangeText={text => handleExerciseChange(index, 'type', text)}
      /> */}

      <Btn onPress={handleSubmit(onSubmit)}>Create</Btn>
    </View>
  );
};

export default AddExercise;
