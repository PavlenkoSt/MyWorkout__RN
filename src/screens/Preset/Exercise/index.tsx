import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {IExercise} from '@app/types/IExercise';

interface IProps {
  exercise: IExercise;
}

const Exercise: FC<IProps> = ({exercise}) => {
  return (
    <View>
      <Text>{exercise.exercise}</Text>
    </View>
  );
};

export default Exercise;

const styles = EStyleSheet.create({});
