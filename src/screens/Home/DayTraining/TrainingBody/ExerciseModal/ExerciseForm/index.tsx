import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import Dropdown from '@app/components/UI-kit/Dropdown';
import {ExerciseTypeEnum, IExerciseWithId} from '@app/types/IExercise';

import LadderExercise from './LadderExercise';
import SingleExercise from './SingleExercise';

interface IProps {
  exerciseToEdit: IExerciseWithId | null;
  onAfterSubmit: () => void;
}

const ExerciseForm: FC<IProps> = ({exerciseToEdit, onAfterSubmit}) => {
  const [type, setType] = useState(
    () => exerciseToEdit?.type || ExerciseTypeEnum.DYNAMIC,
  );

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <View style={styles.formItem}>
          <Text style={styles.title}>Type</Text>
          <Dropdown
            data={[
              ExerciseTypeEnum.DYNAMIC,
              ExerciseTypeEnum.STATIC,
              ExerciseTypeEnum.LADDER,
            ]}
            defaultValue={type}
            onSelect={value => setType(value)}
          />
        </View>
        {type === ExerciseTypeEnum.LADDER ? (
          <LadderExercise onAfterSubmit={onAfterSubmit} type={type} />
        ) : (
          <SingleExercise
            exerciseToEdit={exerciseToEdit}
            onAfterSubmit={onAfterSubmit}
            type={type}
          />
        )}
      </View>
      <Toast />
    </ScrollView>
  );
};

export default ExerciseForm;

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  formItem: {
    marginBottom: 10,
    flex: 1,
  },
  title: {
    marginBottom: 5,
    color: '$white',
  },
});
