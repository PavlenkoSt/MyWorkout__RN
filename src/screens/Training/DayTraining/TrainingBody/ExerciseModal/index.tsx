import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

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
  IExercise,
  IExerciseBackup,
  IExerciseForm,
  IExerciseWithId,
  ILadderExerciseForm,
} from '@app/types/IExercise';
import showToast from '@app/utilts/showToast';

interface IProps {
  visible: boolean;
  onClose: () => void;
  exerciseToEdit: IExerciseWithId | null;
}

const generateLadderExercise = (data: ILadderExerciseForm, i: number) => ({
  exercise: data.exercise.trim(),
  rest: data.rest,
  reps: i,
  sets: 1,
  type: ExerciseTypeEnum.DYNAMIC,
  setsDone: 0,
  id: Date.now().toString() + i,
});

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
          id: Date.now().toString(),
        }),
      );
    }

    onClose();
  };

  const onLadderExerciseSubmit = (data: ILadderExerciseForm) => {
    const {from, to, step} = data;

    if (from === to) {
      return showToast.error('"From" and "To" cannot be equal');
    }

    const exercisesToCreate: IExercise[] = [];

    const fromLessThanTo = from < to;

    if (fromLessThanTo) {
      for (let i = from; i <= to; i += step) {
        exercisesToCreate.push(generateLadderExercise(data, i));
      }
    } else {
      for (let i = from; i >= to; i -= step) {
        exercisesToCreate.push(generateLadderExercise(data, i));
      }
    }

    if (!exercisesToCreate.length || exercisesToCreate.length === 1) {
      return showToast.error('No exercises is generated, check on your step');
    }

    dispatch(
      addExercisesToDay({date: activeDate, exercises: exercisesToCreate}),
    );

    onClose();
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
