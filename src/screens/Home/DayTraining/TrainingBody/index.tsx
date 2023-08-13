import React, {FC, useState} from 'react';

import {IExerciseWithId} from '@app/types/IExercise';

import ExerciseModal from './ExerciseModal';
import ExercisesList from './ExercisesList';

interface IProps {
  isCreation: boolean;
}

const TrainingBody: FC<IProps> = ({isCreation}) => {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(
    () => isCreation,
  );

  const [exerciseToEdit, setExerciseToEdit] = useState<IExerciseWithId | null>(
    null,
  );

  const onCloseModal = () => {
    setExerciseToEdit(null);
    setExerciseModalVisible(false);
  };

  const onChangeEditExersice = (exercise: IExerciseWithId) => {
    setExerciseToEdit(exercise);
    setExerciseModalVisible(true);
  };

  return (
    <>
      <ExercisesList
        onChangeEditExersice={onChangeEditExersice}
        onAddExercisePress={() => setExerciseModalVisible(true)}
      />
      <ExerciseModal
        visible={exerciseModalVisible}
        onClose={onCloseModal}
        exerciseToEdit={exerciseToEdit}
      />
    </>
  );
};

export default TrainingBody;
