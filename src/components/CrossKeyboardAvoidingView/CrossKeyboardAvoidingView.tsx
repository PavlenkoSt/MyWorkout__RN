import React, {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';

interface IProps {
  children: ReactNode;
}

export default function CrossKeyboardAvoidingView({children}: IProps) {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView behavior="padding">{children}</KeyboardAvoidingView>
  ) : (
    <View>{children}</View>
  );
}
