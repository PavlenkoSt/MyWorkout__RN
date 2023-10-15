import React, {FC} from 'react';
import {Platform, StatusBar, StatusBarProps, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

interface IProps extends StatusBarProps {
  height?: number;
}

const FocusAwareStatusBar: FC<IProps> = props => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        height:
          props.height !== void 0
            ? props.height
            : Platform.OS === 'ios'
            ? 30
            : 0,
      }}>
      <StatusBar {...props} />
    </View>
  ) : (
    <></>
  );
};

export default FocusAwareStatusBar;
