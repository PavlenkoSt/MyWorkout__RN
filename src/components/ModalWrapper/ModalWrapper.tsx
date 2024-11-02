import React, {ReactNode} from 'react';
import {StatusBar} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import ReactNativeModal from 'react-native-modal';

interface IProps {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}

export default function ModalWrapper({children, onClose, visible}: IProps) {
  return (
    <>
      {visible && <StatusBar backgroundColor="#333" barStyle="light-content" />}
      <ReactNativeModal
        isVisible={visible}
        hasBackdrop
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        animationIn="slideInUp"
        useNativeDriver
        useNativeDriverForBackdrop
        style={styles.modal}>
        {children}
      </ReactNativeModal>
    </>
  );
}

const styles = EStyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
