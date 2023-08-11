import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import Btn from '@app/components/UI-kit/Btn';
import {IExerciseWithId} from '@app/types/IExercise';

import ExerciseModal from './ExerciseModal';
import ExercisesList from './ExercisesList';

interface IProps {
  isCreation: boolean;
}

const TrainingForm: FC<IProps> = ({isCreation}) => {
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

  return (
    <View>
      <ExercisesList />
      <View style={styles.btnContainer}>
        <Btn onPress={() => setExerciseModalVisible(true)}>+ Add exercise</Btn>
      </View>
      <ExerciseModal
        visible={exerciseModalVisible}
        onClose={onCloseModal}
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
