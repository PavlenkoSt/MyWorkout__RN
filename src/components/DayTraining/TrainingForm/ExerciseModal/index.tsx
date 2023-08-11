import React, {FC} from 'react';
import {Dimensions, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

import {IExerciseWithId} from '@app/types/IExercise';

import ExerciseForm from './ExerciseForm';

interface IProps {
  visible: boolean;
  onClose: () => void;
  exerciseToEdit: IExerciseWithId | null;
}

const HEIGHT = Dimensions.get('screen').height / 2;

const ExerciseModal: FC<IProps> = ({visible, onClose, exerciseToEdit}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      hasBackdrop
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="wobble"
      useNativeDriver
      useNativeDriverForBackdrop
      statusBarTranslucent
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View style={{padding: 20, backgroundColor: '#333', height: HEIGHT}}>
        <ExerciseForm exerciseToEdit={exerciseToEdit} afterSubmit={onClose} />
      </View>
    </ReactNativeModal>
  );
};

export default ExerciseModal;
