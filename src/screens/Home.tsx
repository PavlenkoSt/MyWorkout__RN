import React from 'react';
import {View} from 'react-native';
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {useDispatch, useSelector} from 'react-redux';

import DayTraining from '@app/components/DayTraining';
import datesService from '@app/services/dates.service';
import {activeDateSelector} from '@app/store/selectors/trainingDatSelectors';
import {changeActiveDate} from '@app/store/slices/trainingDaySlice';

export function getMarkedDates() {
  const marked: MarkedDates = {};

  agendaItems.forEach(item => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && item.data[0]) {
      marked[item.title] = {marked: true};
    } else {
      marked[item.title] = {disabled: true};
    }
  });
  return marked;
}

export const agendaItems = [
  {
    title: datesService.today,
    data: [{hour: '12am', duration: '1h', title: 'First Yoga'}],
  },
];

const Home = () => {
  const dispatch = useDispatch();

  const activeDate = useSelector(activeDateSelector);

  return (
    <View style={{flex: 1}}>
      <CalendarProvider
        date={activeDate}
        onDateChanged={date => dispatch(changeActiveDate(date))}
        showTodayButton>
        <ExpandableCalendar firstDay={1} />
        <DayTraining date={activeDate} key={activeDate} />
      </CalendarProvider>
    </View>
  );
};

export default Home;
