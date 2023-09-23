import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';
import {v4} from 'uuid';

import ExerciseForm from '@app/components/ExerciseForm';
import ModalWrapper from '@app/components/ModalWrapper';
import {
  addExercisesToPreset,
  updateExerciseInPreset,
} from '@app/store/slices/presetsSlice';
import {
  ExerciseTypeEnum,
  IExercise,
  IExerciseBackup,
  IExerciseForm,
  ILadderExerciseForm,
} from '@app/types/IExercise';
import generateLadderExercises from '@app/utilts/generateLadderExercises';
import showToast from '@app/utilts/showToast';

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

  useEffect(() => {
    if (!visible) {
      setExerciseBackup(null);
    }
  }, [visible]);

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
        addExercisesToPreset({
          exercises: [
            {
              ...data,
              type,
              setsDone: 0,
              id: v4(),
            },
          ],
          presetId,
        }),
      );
    }

    onClose();
  };

  const onLadderExerciseSubmit = async (data: ILadderExerciseForm) => {
    try {
      const exercisesToCreate = await generateLadderExercises(data);

      dispatch(addExercisesToPreset({exercises: exercisesToCreate, presetId}));

      onClose();
    } catch (e: any) {
      showToast.error(e);
    }
  };

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
