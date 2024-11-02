import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';
import {v4} from 'uuid';

import {FormItem} from '@app/components/FormItem';
import {ModalWrapper} from '@app/components/ModalWrapper';
import Btn from '@app/components/UI-kit/Btn';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {addPreset, updatePreset} from '@app/store/slices/presetsSlice';
import {IExercise} from '@app/types/IExercise';
import {IPreset} from '@app/types/IPreset';
import {presetValidation} from '@app/validations/preset.validation';
import {toastService} from '@app/services/toast.service';

import {CrossKeyboardAvoidingView} from '../CrossKeyboardAvoidingView';
import {PRESET_EDITED_NAME, PRESET_SAVED} from './constants';
import {PresetsRoutesStack} from '@app/navigation';

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

let timer: NodeJS.Timeout | null = null;

export default function PresetModal({
  onClose,
  visible,
  presetToEdit,
  initialExercises,
}: IProps) {
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

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, []);

  const onSubmit = ({name}: IForm) => {
    if (presetToEdit) {
      dispatch(updatePreset({...presetToEdit, name}));
      toastService.success(PRESET_EDITED_NAME);
      onClose();
    } else {
      const id = v4();

      if (!initialExercises) {
        dispatch(addPreset({id, name, exercises: []}));
        onClose();
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          navigation.navigate(PresetsRoutesStack.Preset, {
            id,
            name,
            isAfterCreation: true,
          });
        }, 600);
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
        toastService.success(PRESET_SAVED);
        onClose();
      }
    }
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <CrossKeyboardAvoidingView>
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
      </CrossKeyboardAvoidingView>
    </ModalWrapper>
  );
}

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
