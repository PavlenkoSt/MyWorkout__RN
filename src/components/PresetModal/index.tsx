import {yupResolver} from '@hookform/resolvers/yup';
import React, {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';
import {v4} from 'uuid';

import FormItem from '@app/components/FormItem';
import ModalWrapper from '@app/components/ModalWrapper';
import Btn from '@app/components/UI-kit/Btn';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {addPreset, updatePreset} from '@app/store/slices/presetsSlice';
import {IExercise} from '@app/types/IExercise';
import {IPreset} from '@app/types/IPreset';
import showToast from '@app/utilts/showToast';
import {presetValidation} from '@app/validations/preset.validation';

import {PRESET_EDITED_NAME, PRESET_SAVED} from './constants';

interface IForm {
  name: string;
}

enum MODE {
  CREATE,
  UPDATE,
  SAVE_TRAINING_AS_PRESET,
}

interface IProps {
  visible: boolean;
  onClose: () => void;
  presetToEdit: IPreset | null;
  initialExercises?: IExercise[];
}

const PresetModal: FC<IProps> = ({
  onClose,
  visible,
  presetToEdit,
  initialExercises,
}) => {
  const mode: MODE = presetToEdit
    ? MODE.UPDATE
    : initialExercises
    ? MODE.SAVE_TRAINING_AS_PRESET
    : MODE.CREATE;

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
      const id = v4();

      if (!initialExercises) {
        dispatch(addPreset({id, name, exercises: []}));
        navigation.navigate('Preset', {id, name, isAfterCreation: true});
      } else {
        dispatch(
          addPreset({
            id,
            name,
            exercises: initialExercises.map(ex => ({
              ...ex,
              setsDone: 0,
              id: v4(),
            })),
          }),
        );
        showToast.success(PRESET_SAVED);
      }
    }

    onClose();
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.title}>
            {mode === MODE.UPDATE
              ? 'Update preset'
              : mode === MODE.SAVE_TRAINING_AS_PRESET
              ? 'Save training as preset'
              : 'Add new preset'}
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
            {mode === MODE.UPDATE
              ? 'Update'
              : mode === MODE.SAVE_TRAINING_AS_PRESET
              ? 'Save'
              : 'Create'}
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
