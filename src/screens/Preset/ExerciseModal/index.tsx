import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';

import ExerciseForm from '@app/components/ExerciseForm';
import ModalWrapper from '@app/components/ModalWrapper';
import {
  ExerciseTypeEnum,
  IExerciseBackup,
  IExerciseForm,
  ILadderExerciseForm,
} from '@app/types/IExercise';

interface IProps {
  visible: boolean;
  onClose: () => void;
  presetId: string;
}

const ExerciseModal: FC<IProps> = ({onClose, visible, presetId}) => {
  const [exerciseBackup, setExerciseBackup] = useState<IExerciseBackup | null>(
    null,
  );

  const dispatch = useDispatch();

  const onSingleExerciseSubmit = (
    data: IExerciseForm,
    type: ExerciseTypeEnum,
  ) => {};

  const onLadderExerciseSubmit = (data: ILadderExerciseForm) => {};

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ExerciseForm
          exerciseBackup={exerciseBackup}
          setExerciseBackup={setExerciseBackup}
          exerciseToEdit={null}
          onLadderExerciseSubmit={onLadderExerciseSubmit}
          onSingleExerciseSubmit={onSingleExerciseSubmit}
        />
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
