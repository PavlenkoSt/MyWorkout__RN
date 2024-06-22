import React, {FC} from 'react';
import {
  SwitchProps,
  Switch as SwitchRN,
  Text,
  TouchableOpacity,
} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps extends SwitchProps {}

const Switch: FC<IProps> = ({children, value, onValueChange, ...props}) => {
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
};

export default Switch;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    color: '$white',
    fontSize: 18,
    flex: 1,
  },
});
