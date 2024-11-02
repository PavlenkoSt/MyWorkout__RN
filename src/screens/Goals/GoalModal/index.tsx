import {yupResolver} from '@hookform/resolvers/yup';
import React, {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';
import {v4} from 'uuid';

import {FormItem} from '@app/components/FormItem';
import {ModalWrapper} from '@app/components/ModalWrapper';
import {Btn, Dropdown} from '@app/components/UI-kit';
import {addGoal, updateGoal} from '@app/store/slices/goalsSlice';
import {addExerciseForAutocomplete} from '@app/store/slices/settingsSlice';
import {IGoal} from '@app/types/IGoal';
import {UnitsEnum} from '@app/types/common/Units';
import {recordValidation} from '@app/validations/record.validation';
import {CrossKeyboardAvoidingView} from '@app/components/CrossKeyboardAvoidingView';

interface IForm {
  name: string;
  count: number;
}

interface IProps {
  visible: boolean;
  onClose: () => void;
  goalToEdit: IGoal | null;
}

const GoalModal: FC<IProps> = ({visible, onClose, goalToEdit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(recordValidation),
    defaultValues: goalToEdit
      ? {name: goalToEdit.name, count: goalToEdit.count}
      : {},
  });

  const [units, setUnits] = useState(() => UnitsEnum.REPS);

  const dispatch = useDispatch();

  const onSubmit = (formValues: IForm) => {
    const {name, count} = formValues;
    const trimmedName = name.trim();
    if (goalToEdit) {
      dispatch(
        updateGoal({
          name: trimmedName,
          count,
          units,
          id: goalToEdit.id,
          countArchived: goalToEdit.countArchived,
          completionUpdatedAtTimestamp: goalToEdit.completionUpdatedAtTimestamp,
        }),
      );
    } else {
      dispatch(
        addGoal({
          name: trimmedName,
          count,
          units,
          id: v4(),
          countArchived: 0,
          completionUpdatedAtTimestamp: Date.now(),
        }),
      );
    }
    dispatch(addExerciseForAutocomplete(trimmedName));
    onClose();
  };

  useEffect(() => {
    if (goalToEdit) {
      setValue('name', goalToEdit.name);
      setValue('count', goalToEdit.count);
      setUnits(goalToEdit.units as UnitsEnum.REPS);
    }
  }, [goalToEdit]);

  useEffect(() => {
    if (!visible) {
      reset();
      setUnits(UnitsEnum.REPS);
    }
  }, [visible]);

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <CrossKeyboardAvoidingView>
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="always">
            <Text style={styles.title}>
              {goalToEdit ? 'Update' : 'Add'} goal
            </Text>
            <View style={styles.form}>
              <FormItem
                control={control}
                errors={errors}
                label="Exercise"
                name="name"
              />
              <FormItem
                control={control}
                errors={errors}
                label="Count"
                name="count"
                keyboardType="numeric"
              />
              <View style={styles.formItem}>
                <Text style={styles.formItemTitle}>Units</Text>
                <Dropdown
                  data={[
                    UnitsEnum.REPS,
                    UnitsEnum.SEC,
                    UnitsEnum.MIN,
                    UnitsEnum.KM,
                  ]}
                  defaultValue={units}
                  onSelect={value => setUnits(value)}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Btn onPress={handleSubmit(onSubmit)}>
                {goalToEdit ? 'Save' : '+ Add'}
              </Btn>
            </View>
          </ScrollView>
        </View>
      </CrossKeyboardAvoidingView>
    </ModalWrapper>
  );
};

export default GoalModal;

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#333',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  formItem: {},
  formItemTitle: {
    marginBottom: 5,
    color: '$white',
  },
  btnContainer: {},
});
