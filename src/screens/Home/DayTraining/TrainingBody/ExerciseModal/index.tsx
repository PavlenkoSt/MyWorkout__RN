import React, {FC} from 'react';
import {View} from 'react-native';

import ModalWrapper from '@app/components/ModalWrapper';
import {IExerciseWithId} from '@app/types/IExercise';

import ExerciseForm from './ExerciseForm';

interface IProps {
  visible: boolean;
  onClose: () => void;
  exerciseToEdit: IExerciseWithId | null;
}

const ExerciseModal: FC<IProps> = ({visible, onClose, exerciseToEdit}) => {
  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={{padding: 20, backgroundColor: '#333'}}>
        <ExerciseForm exerciseToEdit={exerciseToEdit} onAfterSubmit={onClose} />
      </View>
    </ModalWrapper>
  );
};

export default ExerciseModal;
