import React, {FC, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {v4} from 'uuid';

import DatePicker from '@app/components/DatePicker';
import ModalWrapper from '@app/components/ModalWrapper';
import Btn from '@app/components/UI-kit/Btn';
import BtnGhost from '@app/components/UI-kit/BtnGhost';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {presetsSelector} from '@app/store/selectors/presetsSelector';
import {
  activeDateSelector,
  allTrainingDaysSelector,
} from '@app/store/selectors/trainingDaySelectors';
import {
  addExercisesToDay,
  changeActiveDate,
} from '@app/store/slices/trainingDaySlice';
import showToast from '@app/utilts/showToast';

import {USE_PRESET_FOR_NOT_EMPTY_DAY_ERROR} from './constants';

interface IProps {
  presetId: string;
}

const UsePreset: FC<IProps> = ({presetId}) => {
  const preset = useSelector(presetsSelector).find(
    preset => preset.id === presetId,
  );
  const trainingDays = useSelector(allTrainingDaysSelector);
  const activeDate = useSelector(activeDateSelector);

  const dispatch = useDispatch();

  const navigation = useTypedNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(() => new Date(activeDate) || new Date());

  useEffect(() => {
    setDate(new Date(activeDate) || new Date());
  }, [activeDate]);

  const use = () => {
    if (!preset) return;

    const onlyDate = date.toISOString().split('T')[0];

    const targetDay = trainingDays.find(day => day.date === onlyDate);

    if (targetDay && targetDay.exercises.length)
      return showToast.error(USE_PRESET_FOR_NOT_EMPTY_DAY_ERROR);

    preset.exercises.forEach((exercise, index) => {
      dispatch(
        addExercisesToDay({
          exercises: [
            {
              id: v4(),
              setsDone: 0,
              reps: exercise.reps,
              rest: exercise.rest,
              sets: exercise.sets,
              type: exercise.type,
              exercise: exercise.exercise,
            },
          ],
          date: onlyDate,
        }),
      );
    });

    dispatch(changeActiveDate(onlyDate));

    setModalVisible(false);

    navigation.navigate('Training');
  };

  if (!preset || !preset.exercises.length) return <></>;

  return (
    <View style={styles.container}>
      <BtnGhost color="#fff" onPress={() => setModalVisible(true)}>
        Use
      </BtnGhost>
      <ModalWrapper
        visible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.title}>Use preset "{preset.name}"</Text>
            <View style={styles.datePickerContainer}>
              <DatePicker date={date} setDate={setDate} />
            </View>
            <Btn onPress={use}>Use</Btn>
          </ScrollView>
        </View>
        <Toast />
      </ModalWrapper>
    </View>
  );
};

export default UsePreset;

const styles = EStyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  modalContainer: {
    padding: 20,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  datePickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
