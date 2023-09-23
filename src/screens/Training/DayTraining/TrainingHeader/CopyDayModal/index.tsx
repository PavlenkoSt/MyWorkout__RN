import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {v4} from 'uuid';

import DatePicker from '@app/components/DatePicker';
import ModalWrapper from '@app/components/ModalWrapper';
import Btn from '@app/components/UI-kit/Btn';
import {
  activeDateSelector,
  allTrainingDaysSelector,
  trainingDateSelector,
} from '@app/store/selectors/trainingDaySelectors';
import {
  addExercisesToDay,
  changeActiveDate,
} from '@app/store/slices/trainingDaySlice';
import {
  COPIED,
  COPY_DAY_TO_NOT_EMPTY_DAY,
  COPY_DAY_TO_SAME_DAY_ERROR,
} from '@app/utilts/constants';
import showToast from '@app/utilts/showToast';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const CopyDayModal: FC<IProps> = ({onClose, visible}) => {
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  const activeDate = useSelector(activeDateSelector);
  const trainingDays = useSelector(allTrainingDaysSelector);
  const trainingDate = useSelector(trainingDateSelector);

  const onCopy = () => {
    const onlyDate = date.toISOString().split('T')[0];

    if (activeDate === onlyDate)
      return showToast.error(COPY_DAY_TO_SAME_DAY_ERROR);

    const targetDay = trainingDays.find(day => day.date === onlyDate);

    if (targetDay && targetDay.exercises.length)
      return showToast.error(COPY_DAY_TO_NOT_EMPTY_DAY);

    if (!trainingDate?.exercises) return showToast.someError();

    trainingDate.exercises.forEach((exercise, index) => {
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

    showToast.success(COPIED);

    onClose();
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Copy training day to</Text>
        <View style={styles.datePickerContainer}>
          <DatePicker date={date} setDate={setDate} />
        </View>
        <Btn onPress={onCopy}>Copy</Btn>
      </View>
      <Toast />
    </ModalWrapper>
  );
};

export default CopyDayModal;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 20,
  },
  header: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
