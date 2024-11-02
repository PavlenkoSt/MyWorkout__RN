import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import flatten from '@app/utilts/flatten';
import {ColorVars} from '@app/utilts/theme';

export interface IBtnProps {
  onPress: () => void;
  children: React.ReactNode;
  btnStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Btn({
  onPress,
  btnStyle,
  textStyle,
  children,
}: IBtnProps) {
  return (
    <TouchableOpacity onPress={onPress} style={flatten([styles.btn, btnStyle])}>
      <Text style={flatten([styles.text, textStyle])}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  btn: {
    backgroundColor: ColorVars.$primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
});
