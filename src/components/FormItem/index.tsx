import React, {FC} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {Text, TextInputProps, View} from 'react-native';

import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Input from '../UI-kit/Input';

interface IProps extends TextInputProps {
  control: Control<any, any>;
  name: string;
  errors: FieldErrors<any>;
  label: string;
}

const FormItem: FC<IProps> = ({control, name, errors, label}) => {
  return (
    <View style={styles.formItem}>
      <Text style={styles.title}>{label}</Text>
      <Controller
        control={control}
        render={({field}) => (
          <Input
            value={String(field.value || '')}
            onChangeText={field.onChange}
          />
        )}
        name={name}
      />
      {!!errors[name] && (
        <Text style={styles.error}>
          {errors[name]?.message?.toString() || ''}
        </Text>
      )}
    </View>
  );
};

export default FormItem;

const styles = EStyleSheet.create({
  formItem: {
    marginBottom: 10,
    flex: 1,
  },
  title: {
    marginBottom: 5,
    color: '$white',
  },
  error: {
    marginTop: 2,
    color: 'red',
    fontSize: 10,
  },
});
