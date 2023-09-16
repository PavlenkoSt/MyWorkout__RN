import React, {FC} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import flatten from '@app/utilts/flatten';

export interface IBtnProps {
  onPress: () => void;
  children: React.ReactNode;
  btnStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Btn: FC<IBtnProps> = ({onPress, btnStyle, textStyle, children}) => {
  return (
    <TouchableOpacity onPress={onPress} style={flatten([styles.btn, btnStyle])}>
      <Text style={flatten([styles.text, textStyle])}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = EStyleSheet.create({
  btn: {
    backgroundColor: '$primaryColor',
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
