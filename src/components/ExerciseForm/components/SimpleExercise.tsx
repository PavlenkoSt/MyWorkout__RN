import Btn from '@app/components/UI-kit/Btn';
import React from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  onSubmit: () => void;
}

export default function SimpleExercise({onSubmit}: IProps) {
  return (
    <View style={styles.btnContainer}>
      <Btn onPress={onSubmit}>+ Add</Btn>
    </View>
  );
}

const styles = EStyleSheet.create({
  btnContainer: {
    marginTop: 20,
  },
});
