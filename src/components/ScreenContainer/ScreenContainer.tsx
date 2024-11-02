import {ColorVars} from '@app/utilts/theme';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  children: ReactNode;
}

export default function ScreenContainer({children}: IProps) {
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>{children}</View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorVars.$bgColor,
  },
});
