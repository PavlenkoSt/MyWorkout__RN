import React, {FC} from 'react';
import {View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

import {IExercise, IExerciseWithId} from '@app/types/IExercise';
import ExerciseForm from './ExerciseForm';

interface IProps {
  visible: boolean;
  onClose: () => void;
  onAddExercise: (exercise: IExercise) => void;
  onEditExercise: (updatedExercise: IExerciseWithId) => void;
  exerciseToEdit: IExerciseWithId | null;
}

const HEIGHT = 340;

const ExerciseModal: FC<IProps> = ({
  visible,
  onClose,
  onAddExercise,
  onEditExercise,
  exerciseToEdit,
}) => {
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
        <ExerciseForm
          exerciseToEdit={exerciseToEdit}
          onAddExercise={onAddExercise}
          onEditExercise={onEditExercise}
        />
      </View>
    </ReactNativeModal>
  );
};

export default ExerciseModal;
