import React, {FC} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import Btn from '@app/components/UI-kit/Btn';

interface IProps {
  onAddExercisePress: () => void;
}

const ExercisesFooter: FC<IProps> = ({onAddExercisePress}) => {
  return (
    <View style={styles.btnContainer}>
      <Btn onPress={onAddExercisePress}>+ Add exercise</Btn>
    </View>
  );
};

export default ExercisesFooter;

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
});
