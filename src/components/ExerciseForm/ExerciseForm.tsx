import React, {Dispatch, SetStateAction, useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import Dropdown from '@app/components/UI-kit/Dropdown';
import {
  ExerciseTypeEnum,
  IExerciseBackup,
  IExerciseForm,
  IExerciseWithId,
  ILadderExerciseForm,
} from '@app/types/IExercise';
import {
  exerciseConstructorService,
  SimpleExerciseType,
} from '@app/services/exerciseConstructor.service';
import {ColorVars} from '@app/utilts/theme';

import {LadderExercise, SingleExercise, SimpleExercise} from './components';

interface IProps {
  exerciseToEdit: IExerciseWithId | null;
  exerciseBackup: IExerciseBackup | null;
  setExerciseBackup: Dispatch<SetStateAction<IExerciseBackup | null>>;
  onSingleExerciseSubmit: (data: IExerciseForm, type: ExerciseTypeEnum) => void;
  onLadderExerciseSubmit: (data: ILadderExerciseForm) => void;
  onSimpleExerciseSubmit: (type: SimpleExerciseType) => void;
}

export default function ExerciseForm({
  exerciseToEdit,
  exerciseBackup,
  setExerciseBackup,
  onSingleExerciseSubmit,
  onLadderExerciseSubmit,
  onSimpleExerciseSubmit,
}: IProps) {
  const [type, setType] = useState(
    () => exerciseToEdit?.type || ExerciseTypeEnum.DYNAMIC,
  );

  const commonFormsProps = {
    exerciseBackup,
    setExerciseBackup,
  };

  const isSimpleForm = exerciseConstructorService.isSimpleExerciseType(type);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formItem}>
          <Text style={styles.title}>Type</Text>
          <Dropdown
            data={[
              ExerciseTypeEnum.DYNAMIC,
              ExerciseTypeEnum.STATIC,
              ExerciseTypeEnum.LADDER,
              ExerciseTypeEnum.WARMUP,
              ExerciseTypeEnum.HANDBALANCE_SESSION,
              ExerciseTypeEnum.FLEXIBILITY_SESSION,
            ]}
            defaultValue={type}
            onSelect={value => setType(value)}
          />
        </View>
        {isSimpleForm ? (
          <SimpleExercise
            onSubmit={() => onSimpleExerciseSubmit(type as SimpleExerciseType)}
          />
        ) : type === ExerciseTypeEnum.LADDER ? (
          <LadderExercise
            {...commonFormsProps}
            onSubmit={onLadderExerciseSubmit}
          />
        ) : (
          <SingleExercise
            {...commonFormsProps}
            exerciseToEdit={exerciseToEdit}
            onSubmit={onSingleExerciseSubmit}
            type={type}
          />
        )}
      </View>
      <Toast />
    </>
  );
}

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
    color: ColorVars.$white,
  },
});
