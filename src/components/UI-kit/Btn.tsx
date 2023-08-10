import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface IProps {
  onPress: () => void;
  children: React.ReactNode;
}

const Btn: FC<IProps> = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default Btn;
