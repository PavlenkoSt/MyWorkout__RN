import {yupResolver} from '@hookform/resolvers/yup';
import React, {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';

import FormItem from '@app/components/FormItem';
import ModalWrapper from '@app/components/ModalWrapper';
import Btn from '@app/components/UI-kit/Btn';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {addPreset, updatePreset} from '@app/store/slices/presetsSlice';
import {IPreset} from '@app/types/IPreset';
import showToast from '@app/utilts/showToast';
import {presetValidation} from '@app/validations/preset.validation';

import {PRESET_EDITED_NAME} from '../constants';

interface IForm {
  name: string;
}

interface IProps {
  visible: boolean;
  onClose: () => void;
  presetToEdit: IPreset | null;
}

const PresetModal: FC<IProps> = ({onClose, visible, presetToEdit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(presetValidation),
    defaultValues: {
      name: presetToEdit?.name || '',
    },
  });

  const dispatch = useDispatch();
  const navigation = useTypedNavigation();

  useEffect(() => {
    if (!visible) {
      reset();
    }
  }, [visible]);

  useEffect(() => {
    if (visible && presetToEdit) {
      setValue('name', presetToEdit.name);
    }
  }, [visible, presetToEdit]);

  const onSubmit = ({name}: IForm) => {
    if (presetToEdit) {
      dispatch(updatePreset({...presetToEdit, name}));
      showToast.success(PRESET_EDITED_NAME);
    } else {
      const id = Date.now().toString();
      dispatch(addPreset({id, name, exercises: []}));
      navigation.navigate('Preset', {id, name});
    }

    onClose();
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.title}>
            {presetToEdit ? 'Update preset' : 'Add new preset'}
          </Text>
          <View style={styles.form}>
            <FormItem
              control={control}
              errors={errors}
              label="Name"
              name="name"
            />
          </View>
          <Btn onPress={handleSubmit(onSubmit)}>
            {presetToEdit ? 'Update' : 'Create'}
          </Btn>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default PresetModal;

const styles = EStyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  form: {
    marginBottom: 15,
  },
});
