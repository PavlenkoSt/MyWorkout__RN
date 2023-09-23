import React, {FC} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';

interface IProps {
  route: {
    params: {
      id: string;
    };
  };
}

const Preset: FC<IProps> = ({route}) => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$primaryColor')}
        barStyle="light-content"
      />
    </View>
  );
};

export default Preset;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
});
