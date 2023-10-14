import React, {FC, ReactNode} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  children: ReactNode;
}

const ScreenContainer: FC<IProps> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default ScreenContainer;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
});
