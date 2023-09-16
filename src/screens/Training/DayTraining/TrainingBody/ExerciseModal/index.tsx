import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';

import ModalWrapper from '@app/components/ModalWrapper';
import {IExerciseWithId} from '@app/types/IExercise';

import ExerciseForm from './ExerciseForm';

export interface IExerciseBackup {
  exercise: string;
}

interface IProps {
  visible: boolean;
  onClose: () => void;
  exerciseToEdit: IExerciseWithId | null;
}

const ExerciseModal: FC<IProps> = ({visible, onClose, exerciseToEdit}) => {
  const [exerciseBackup, setExerciseBackup] = useState<IExerciseBackup | null>(
    null,
  );

  useEffect(() => {
    if (!visible) {
      setExerciseBackup(null);
    }
  }, [visible]);

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={{padding: 20, backgroundColor: '#333'}}>
        <ExerciseForm
          exerciseToEdit={exerciseToEdit}
          onAfterSubmit={onClose}
          exerciseBackup={exerciseBackup}
          setExerciseBackup={setExerciseBackup}
        />
      </View>
    </ModalWrapper>
  );
};

export default ExerciseModal;
