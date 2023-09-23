import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {v4} from 'uuid';

import ExerciseForm from '@app/components/ExerciseForm';
import ModalWrapper from '@app/components/ModalWrapper';
import {activeDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {
  addExercise,
  addExercisesToDay,
  updateExercise,
} from '@app/store/slices/trainingDaySlice';
import {
  ExerciseTypeEnum,
  IExerciseBackup,
  IExerciseForm,
  IExerciseWithId,
  ILadderExerciseForm,
} from '@app/types/IExercise';
import generateLadderExercises from '@app/utilts/generateLadderExercises';
import showToast from '@app/utilts/showToast';

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
          id,
          type,
          setsDone,
          ...data,
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

    onClose();
  };

  const onLadderExerciseSubmit = async (data: ILadderExerciseForm) => {
    try {
      const exercisesToCreate = await generateLadderExercises(data);

      dispatch(
        addExercisesToDay({date: activeDate, exercises: exercisesToCreate}),
      );

      onClose();
    } catch (e: any) {
      showToast.error(e);
    }
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={{padding: 20, backgroundColor: '#333'}}>
        <ExerciseForm
          exerciseToEdit={exerciseToEdit}
          exerciseBackup={exerciseBackup}
          setExerciseBackup={setExerciseBackup}
          onSingleExerciseSubmit={onSingleExerciseSubmit}
          onLadderExerciseSubmit={onLadderExerciseSubmit}
        />
      </View>
    </ModalWrapper>
  );
};

export default ExerciseModal;
