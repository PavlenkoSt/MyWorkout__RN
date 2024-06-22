import React, {FC} from 'react';
import {StatusBar, StatusBarProps, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps extends StatusBarProps {
  height?: number;
}

const FocusAwareStatusBar: FC<IProps> = props => {
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
};

export default FocusAwareStatusBar;
