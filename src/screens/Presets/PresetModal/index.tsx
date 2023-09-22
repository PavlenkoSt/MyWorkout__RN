import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import FormItem from '@app/components/FormItem';
import ModalWrapper from '@app/components/ModalWrapper';
import Btn from '@app/components/UI-kit/Btn';
import {addPreset} from '@app/store/slices/presetsSlice';
import {presetValidation} from '@app/validations/preset.validation';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

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
  const navigation =
    useNavigation<NativeStackNavigationProp<{Preset: {id: string}}>>();

  useEffect(() => {
    if (!visible) {
      reset();
    }
  }, [visible]);

  const onSubmit = (values: IForm) => {
    const id = Date.now().toString();

    dispatch(addPreset({id, name: values.name, exercises: []}));

    onClose();
    navigation.navigate('Preset', {id});
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
