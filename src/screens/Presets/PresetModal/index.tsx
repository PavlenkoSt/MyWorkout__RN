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
import {addPreset} from '@app/store/slices/presetsSlice';
import {presetValidation} from '@app/validations/preset.validation';

interface IForm {
  name: string;
}

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const PresetModal: FC<IProps> = ({onClose, visible}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(presetValidation),
  });

  const dispatch = useDispatch();
  const navigation = useTypedNavigation();

  useEffect(() => {
    if (!visible) {
      reset();
    }
  }, [visible]);

  const onSubmit = ({name}: IForm) => {
    const id = Date.now().toString();

    dispatch(addPreset({id, name, exercises: []}));

    onClose();
    navigation.navigate('Preset', {id, name});
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.title}>Add new preset</Text>
          <View style={styles.form}>
            <FormItem
              control={control}
              errors={errors}
              label="Name"
              name="name"
            />
          </View>
          <Btn onPress={handleSubmit(onSubmit)}>Create</Btn>
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
