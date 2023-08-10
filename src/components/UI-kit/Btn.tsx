import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  onPress: () => void;
  children: React.ReactNode;
}

const Btn: FC<IProps> = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>{children}</Text>
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
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 15,
    color: '#fff',
  },
});
