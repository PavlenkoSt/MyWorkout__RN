import React, {FC, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {v4} from 'uuid';

import {ExerciseForm} from '@app/components/ExerciseForm';
import {ModalWrapper} from '@app/components/ModalWrapper';
import {activeDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {addExerciseForAutocomplete} from '@app/store/slices/settingsSlice';
import {
  addExercise,
  addExercisesToDay,
  deleteExercise,
  updateExercise,
} from '@app/store/slices/trainingDaySlice';
import {
  ExerciseTypeEnum,
  IExerciseBackup,
  IExerciseForm,
  IExerciseWithId,
  ILadderExerciseForm,
} from '@app/types/IExercise';
import {CrossKeyboardAvoidingView} from '@app/components/CrossKeyboardAvoidingView';
import {
  SimpleExerciseType,
  exerciseConstructorService,
} from '@app/services/exerciseConstructor.service';
import {toastService} from '@app/services/toast.service';

interface IProps {
  visible: boolean;
  onClose: () => void;
  exerciseToEdit: IExerciseWithId | null;
}

const ExerciseModal: FC<IProps> = ({visible, onClose, exerciseToEdit}) => {
  const [exerciseBackup, setExerciseBackup] = useState<IExerciseBackup | null>(
    null,
  );

  const activeDate = useSelector(activeDateSelector);

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
      const {id, setsDone} = exerciseToEdit;

      dispatch(
        updateExercise({
          ...data,
          id,
          type,
          setsDone,
          exercise: data.exercise.trim(),
        }),
      );
    } else {
      dispatch(
        addExercise({
          ...data,
          exercise: data.exercise.trim(),
          type,
          setsDone: 0,
          id: v4(),
        }),
      );
    }
    dispatch(addExerciseForAutocomplete(data.exercise));

    onClose();
  };

  const onLadderExerciseSubmit = async (data: ILadderExerciseForm) => {
    try {
      if (exerciseToEdit) {
        dispatch(deleteExercise({id: exerciseToEdit.id}));
      }

      const exercisesToCreate =
        await exerciseConstructorService.generateLadderExercises(data);

      dispatch(
        addExercisesToDay({date: activeDate, exercises: exercisesToCreate}),
      );
      dispatch(addExerciseForAutocomplete(data.exercise));

      onClose();
    } catch (e: any) {
      toastService.error(e);
    }
  };

  const onSimpleExerciseSubmit = async (type: SimpleExerciseType) => {
    const exercise = exerciseConstructorService.generateSimpleExercise(type);

    if (exerciseToEdit) {
      const {id, setsDone} = exerciseToEdit;

      dispatch(
        updateExercise({
          id,
          setsDone,
          ...exercise,
        }),
      );
    } else {
      dispatch(
        addExercise({
          ...exercise,
          setsDone: 0,
          id: v4(),
        }),
      );
    }

    onClose();
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <CrossKeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{padding: 20, backgroundColor: '#333'}}>
            <ExerciseForm
              exerciseToEdit={exerciseToEdit}
              exerciseBackup={exerciseBackup}
              setExerciseBackup={setExerciseBackup}
              onSingleExerciseSubmit={onSingleExerciseSubmit}
              onLadderExerciseSubmit={onLadderExerciseSubmit}
              onSimpleExerciseSubmit={onSimpleExerciseSubmit}
            />
          </View>
        </ScrollView>
      </CrossKeyboardAvoidingView>
    </ModalWrapper>
  );
};

export default ExerciseModal;
