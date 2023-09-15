import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import {activeDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {changeActiveDate} from '@app/store/slices/trainingDaySlice';
import dateTime from '@app/utilts/dateTime';

import ArrowUpIcon from '../../../components/Icons/ArrowUpIcon';

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
      <View>
        <ArrowUpIcon
          stroke={EStyleSheet.value('$primaryColor')}
          width={20}
          height={20}
        />
      </View>
      <Text style={styles.text}>Today</Text>
    </TouchableOpacity>
  );
};

export default memo(CalendarTodayBtn);

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ededed',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '$primaryColor',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '$primaryColor',
    fontWeight: '600',
    fontSize: 15,
  },
});
