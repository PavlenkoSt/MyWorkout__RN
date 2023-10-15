import React, {FC, ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';

interface IProps {
  children: ReactNode;
}

const CrossKeyboardAvoidingView: FC<IProps> = ({children}) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView behavior="padding">{children}</KeyboardAvoidingView>
  ) : (
    <View>{children}</View>
  );
};

export default CrossKeyboardAvoidingView;
