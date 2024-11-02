import {ColorVars} from '@app/utilts/theme';
import React from 'react';
import {
  SwitchProps,
  Switch as SwitchRN,
  Text,
  TouchableOpacity,
} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps extends SwitchProps {}

export default function Switch({
  children,
  value,
  onValueChange,
  ...props
}: IProps) {
  const onPress = () => {
    if (!onValueChange) return;

    onValueChange(!value);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <SwitchRN value={value} onValueChange={onValueChange} {...props} />
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    color: ColorVars.$white,
    fontSize: 18,
    flex: 1,
  },
});
