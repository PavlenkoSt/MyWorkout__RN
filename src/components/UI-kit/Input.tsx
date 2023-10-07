import React, {FC} from 'react';
import {KeyboardTypeOptions, TextInput, TextInputProps} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps extends TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const Input: FC<IProps> = props => {
  return (
    <TextInput
      {...props}
      cursorColor={EStyleSheet.value('$white')}
      style={styles.input}
    />
  );
};

export default Input;

const styles = EStyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#fff',
  },
});
