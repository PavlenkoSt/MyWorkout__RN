import React from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import useMounted from '@app/hooks/useMounted';

import Actions from './Actions';

import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Loader from '@app/components/Loader';

const Settings = () => {
  const {mounted} = useMounted();

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$bgColor')}
        barStyle="light-content"
      />
      {!mounted ? <Loader /> : <Actions />}
    </View>
  );
};

export default Settings;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
});
