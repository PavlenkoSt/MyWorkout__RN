import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  route: {
    params: {
      id: string;
    };
  };
}

const Preset: FC<IProps> = ({route}) => {
  return (
    <View>
      <Text>Preset</Text>
    </View>
  );
};

export default Preset;

const styles = EStyleSheet.create({});
