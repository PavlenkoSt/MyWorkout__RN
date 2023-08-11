import React, {FC} from 'react';
import {StatusBar, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

import {IExerciseWithId} from '@app/types/IExercise';

import ExerciseForm from './ExerciseForm';

interface IProps {
  visible: boolean;
  onClose: () => void;
  exerciseToEdit: IExerciseWithId | null;
}

const ExerciseModal: FC<IProps> = ({visible, onClose, exerciseToEdit}) => {
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
        <View style={{padding: 20, backgroundColor: '#333'}}>
          <ExerciseForm
            exerciseToEdit={exerciseToEdit}
            onAfterSubmit={onClose}
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default ExerciseModal;
