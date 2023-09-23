import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import ModalWrapper from '@app/components/ModalWrapper';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ExerciseModal: FC<IProps> = ({onClose, visible}) => {
  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ScrollView></ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default ExerciseModal;

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#333',
  },
});
