import React from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {ModalWrapper} from '../ModalWrapper';
import BtnGhost from '../UI-kit/BtnGhost';

interface IProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({visible, onClose, onConfirm}: IProps) {
  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.text}>Are you sure?</Text>
        <View style={styles.btns}>
          <BtnGhost
            color="#fff"
            btnStyle={styles.btnAdditionalStyles}
            onPress={onClose}>
            No
          </BtnGhost>
          <BtnGhost
            color="red"
            btnStyle={styles.btnAdditionalStyles}
            onPress={() => {
              onConfirm();
              onClose();
            }}>
            Yes
          </BtnGhost>
        </View>
      </View>
    </ModalWrapper>
  );
}

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '$bgColor',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  btnAdditionalStyles: {
    flex: 1,
  },
});
