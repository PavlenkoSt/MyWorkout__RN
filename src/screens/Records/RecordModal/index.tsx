import {yupResolver} from '@hookform/resolvers/yup';
import React, {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';
import {v4} from 'uuid';

import FormItem from '@app/components/FormItem';
import ModalWrapper from '@app/components/ModalWrapper';
import Btn from '@app/components/UI-kit/Btn';
import Dropdown from '@app/components/UI-kit/Dropdown';
import {addRecord, updateRecord} from '@app/store/slices/recordsSlice';
import {IRecord, RecordUnitsEnum} from '@app/types/IRecord';
import {recordValidation} from '@app/validations/record.validation';

interface IForm {
  name: string;
  count: number;
}

interface IProps {
  visible: boolean;
  onClose: () => void;
  recordToEdit: IRecord | null;
}

const RecordModal: FC<IProps> = ({visible, onClose, recordToEdit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(recordValidation),
    defaultValues: recordToEdit
      ? {name: recordToEdit.name, count: recordToEdit.count}
      : {},
  });

  const [units, setUnits] = useState(() => RecordUnitsEnum.REPS);

  const dispatch = useDispatch();

  const onSubmit = (formValues: IForm) => {
    const {name, count} = formValues;

    if (recordToEdit) {
      dispatch(
        updateRecord({name: name.trim(), count, units, id: recordToEdit.id}),
      );
    } else {
      dispatch(addRecord({name: name.trim(), count, units, id: v4()}));
    }
    onClose();
  };

  useEffect(() => {
    if (recordToEdit) {
      setValue('name', recordToEdit.name);
      setValue('count', recordToEdit.count);
      setUnits(recordToEdit.units as RecordUnitsEnum.REPS);
    }
  }, [recordToEdit]);

  useEffect(() => {
    if (!visible) {
      reset();
      setUnits(RecordUnitsEnum.REPS);
    }
  }, [visible]);

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.title}>
            {recordToEdit ? 'Update' : 'Add'} record
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
                  RecordUnitsEnum.REPS,
                  RecordUnitsEnum.SEC,
                  RecordUnitsEnum.MIN,
                  RecordUnitsEnum.KM,
                ]}
                defaultValue={units}
                onSelect={value => setUnits(value)}
              />
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Btn onPress={handleSubmit(onSubmit)}>
              {recordToEdit ? 'Save' : '+ Add'}
            </Btn>
          </View>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default RecordModal;

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
