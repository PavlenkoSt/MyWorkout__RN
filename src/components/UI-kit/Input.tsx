import {ColorVars} from '@app/utilts/theme';
import React from 'react';
import {KeyboardTypeOptions, TextInput, TextInputProps} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps extends TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export default function Input(props: IProps) {
  return (
    <TextInput
      {...props}
      cursorColor={EStyleSheet.value(ColorVars.$white)}
      selectionColor={EStyleSheet.value(ColorVars.$white)}
      style={styles.input}
    />
  );
}

const styles = EStyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#fff',
    height: 40,
  },
});
