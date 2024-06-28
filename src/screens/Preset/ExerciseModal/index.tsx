import React, {FC, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';
import {v4} from 'uuid';

import ExerciseForm from '@app/components/ExerciseForm';
import ModalWrapper from '@app/components/ModalWrapper';
import {
  addExercisesToPreset,
  deleteExerciseInPreset,
  updateExerciseInPreset,
} from '@app/store/slices/presetsSlice';
import {addExerciseForAutocomplete} from '@app/store/slices/settingsSlice';
import {
  ExerciseTypeEnum,
  IExercise,
  IExerciseBackup,
  IExerciseForm,
  ILadderExerciseForm,
} from '@app/types/IExercise';
import generateLadderExercises from '@app/utilts/generateLadderExercises';
import showToast from '@app/utilts/showToast';
import CrossKeyboardAvoidingView from '@app/components/CrossKeyboardAvoidingView';
import {WARMUP_TITLE} from '@app/utilts/constants';

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

    dispatch(addExerciseForAutocomplete(data.exercise));

    onClose();
  };

  const onLadderExerciseSubmit = async (data: ILadderExerciseForm) => {
    try {
      if (exerciseToEdit) {
        dispatch(deleteExerciseInPreset({exercise: exerciseToEdit, presetId}));
      }

      const exercisesToCreate = await generateLadderExercises(data);

      dispatch(addExercisesToPreset({exercises: exercisesToCreate, presetId}));
      dispatch(addExerciseForAutocomplete(data.exercise));

      onClose();
    } catch (e: any) {
      showToast.error(e);
    }
  };

  const onWarmupExerciseSubmit = () => {
    const exercise = {
      type: ExerciseTypeEnum.WARMUP,
      exercise: WARMUP_TITLE,
      reps: 1,
      rest: 0,
      sets: 1,
    };

    if (exerciseToEdit) {
      dispatch(
        updateExerciseInPreset({
          exercise: {
            ...exerciseToEdit,
            ...exercise,
          },
          presetId,
        }),
      );
    } else {
      dispatch(
        addExercisesToPreset({
          exercises: [
            {
              ...exercise,
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

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <CrossKeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <ExerciseForm
              exerciseBackup={exerciseBackup}
              setExerciseBackup={setExerciseBackup}
              exerciseToEdit={exerciseToEdit}
              onLadderExerciseSubmit={onLadderExerciseSubmit}
              onSingleExerciseSubmit={onSingleExerciseSubmit}
              onWarmupExerciseSubmit={onWarmupExerciseSubmit}
            />
          </View>
        </ScrollView>
      </CrossKeyboardAvoidingView>
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
