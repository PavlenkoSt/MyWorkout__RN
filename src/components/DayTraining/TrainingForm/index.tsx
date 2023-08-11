import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import Btn from '@app/components/UI-kit/Btn';
import {IExercise, IExerciseWithId} from '@app/types/IExercise';
import {ITrainingDay} from '@app/types/ITrainingDay';
import ExerciseModal from './ExerciseModal';

interface IProps {
  isCreation: boolean;
  trainingDay: ITrainingDay | null;
}

const TrainingForm: FC<IProps> = ({isCreation, trainingDay}) => {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(
    () => isCreation,
  );

  const [exercises, setExercises] = useState<IExerciseWithId[]>(
    () =>
      trainingDay?.exercises.map((exercise, idx) => ({
        ...exercise,
        id: idx.toString(),
      })) || [],
  );

  const [exerciseToEdit, setExerciseToEdit] = useState<IExerciseWithId | null>(
    null,
  );

  const onAddExercise = (exercise: IExercise) => {
    setExercises(prev => [...prev, {...exercise, id: Date.now().toString()}]);
    setExerciseModalVisible(false);
  };

  const onEditExercise = (updatedExercise: IExerciseWithId) => {
    setExercises(prev =>
      prev.map(exercise => {
        if (exercise.id === updatedExercise.id) return updatedExercise;

        return exercise;
      }),
    );
    setExerciseModalVisible(false);
  };

  const onCloseModal = () => {
    setExerciseToEdit(null);
    setExerciseModalVisible(false);
  };

  return (
    <View>
      <View style={styles.btnContainer}>
        <Btn onPress={() => setExerciseModalVisible(true)}>+ Add exercise</Btn>
      </View>
      <ExerciseModal
        visible={exerciseModalVisible}
        onClose={onCloseModal}
        onAddExercise={onAddExercise}
        onEditExercise={onEditExercise}
        exerciseToEdit={exerciseToEdit}
      />
    </View>
  );
};

export default TrainingForm;

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
