import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import ModalWrapper from '@app/components/ModalWrapper';
import {clearFallback} from '@app/store/slices/exerciseFormFallbackSlice';
import {IExerciseWithId} from '@app/types/IExercise';

import ExerciseForm from './ExerciseForm';

interface IProps {
  visible: boolean;
  onClose: () => void;
  exerciseToEdit: IExerciseWithId | null;
}

const ExerciseModal: FC<IProps> = ({visible, onClose, exerciseToEdit}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!visible) {
      dispatch(clearFallback());
    }
  }, [visible]);

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={{padding: 20, backgroundColor: '#333'}}>
        <ExerciseForm exerciseToEdit={exerciseToEdit} onAfterSubmit={onClose} />
      </View>
    </ModalWrapper>
  );
};

export default ExerciseModal;
