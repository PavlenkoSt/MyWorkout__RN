import React from 'react';
import {StatusBar, StatusBarProps, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps extends StatusBarProps {
  height?: number;
}

export default function FocusAwareStatusBar(props: IProps) {
  const isFocused = useIsFocused();
  const {top} = useSafeAreaInsets();

  return isFocused ? (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        height: props.height !== void 0 ? props.height : top,
      }}>
      <StatusBar {...props} />
    </View>
  ) : (
    <></>
  );
}
