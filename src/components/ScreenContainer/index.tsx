import React, {FC, ReactNode} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  children: ReactNode;
}

const ScreenContainer: FC<IProps> = ({children}) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>{children}</View>
  );
};

export default ScreenContainer;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
});
