import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';

import ExerciseForm from '@app/components/ExerciseForm';
import ModalWrapper from '@app/components/ModalWrapper';
import {
  addExerciseToPreset,
  updateExerciseInPreset,
} from '@app/store/slices/presetsSlice';
import {
  ExerciseTypeEnum,
  IExercise,
  IExerciseBackup,
  IExerciseForm,
  ILadderExerciseForm,
} from '@app/types/IExercise';

interface IProps {
  visible: boolean;
  onClose: () => void;
  presetId: string;
  exerciseToEdit: IExercise | null;
}

const ExerciseModal: FC<IProps> = ({
  onClose,
  visible,
  presetId,
  exerciseToEdit,
}) => {
  const [exerciseBackup, setExerciseBackup] = useState<IExerciseBackup | null>(
    null,
  );

  const dispatch = useDispatch();

  const onSingleExerciseSubmit = (
    data: IExerciseForm,
    type: ExerciseTypeEnum,
  ) => {
    if (exerciseToEdit) {
      dispatch(
        updateExerciseInPreset({
          exercise: {
            ...exerciseToEdit,
            ...data,
            type,
          },
          presetId,
        }),
      );
    } else {
      dispatch(
        addExerciseToPreset({
          exercise: {
            ...data,
            type,
            setsDone: 0,
            id: Date.now().toString(),
          },
          presetId,
        }),
      );
    }

    onClose();
  };

  const onLadderExerciseSubmit = (data: ILadderExerciseForm) => {};

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ExerciseForm
          exerciseBackup={exerciseBackup}
          setExerciseBackup={setExerciseBackup}
          exerciseToEdit={exerciseToEdit}
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
