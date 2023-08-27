import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import {activeDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {changeActiveDate} from '@app/store/slices/trainingDaySlice';
import dateTime from '@app/utilts/dateTime';

const CalendarTodayBtn = () => {
  const dispatch = useDispatch();

  const activeDate = useSelector(activeDateSelector);

  const isToday = dateTime.isToday(activeDate);

  const onPress = () => {
    dispatch(changeActiveDate(dateTime.getTodayDate()));
  };

  if (isToday) return <></>;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Today ↑</Text>
    </TouchableOpacity>
  );
};

export default memo(CalendarTodayBtn);

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#ededed',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '$primaryColor',
  },
  text: {
    color: '$primaryColor',
    fontWeight: '600',
    fontSize: 15,
  },
});
