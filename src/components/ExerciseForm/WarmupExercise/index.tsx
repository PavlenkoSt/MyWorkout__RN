import Btn from '@app/components/UI-kit/Btn';
import React, {FC} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  onSubmit: () => void;
}

const WarmupExercise: FC<IProps> = ({onSubmit}) => {
  return (
    <View style={styles.btnContainer}>
      <Btn onPress={onSubmit}>+ Add</Btn>
    </View>
  );
};

export default WarmupExercise;

const styles = EStyleSheet.create({
  btnContainer: {
    marginTop: 20,
  },
});
