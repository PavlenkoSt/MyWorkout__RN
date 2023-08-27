import React, {FC, ReactNode} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import ReactNativeModal from 'react-native-modal';

interface IProps {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}

const ModalWrapper: FC<IProps> = ({children, onClose, visible}) => {
  return (
    <>
      {visible && <StatusBar backgroundColor="#333" barStyle="light-content" />}
      <ReactNativeModal
        isVisible={visible}
        hasBackdrop
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        animationIn="wobble"
        useNativeDriver
        useNativeDriverForBackdrop
        style={{justifyContent: 'flex-end', margin: 0}}>
        {children}
      </ReactNativeModal>
    </>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({});
