/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {Provider} from 'react-redux';

import store from './store';

import DayTraining from './components/DayTraining';
import useRealmContext from './hooks/useRealmContext';
import datesService from './services/dates.service';

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

const App = (): JSX.Element => {
  const marked = useRef(getMarkedDates());

  const {RealmProvider} = useRealmContext();

  const [activeDate, setActiveDate] = useState(datesService.today);

  return (
    <Provider store={store}>
      <RealmProvider>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={{flex: 1}}>
          <CalendarProvider
            date={activeDate}
            onDateChanged={setActiveDate}
            showTodayButton>
            <ExpandableCalendar firstDay={1} />
            <DayTraining date={activeDate} key={activeDate} />
          </CalendarProvider>
        </View>
      </RealmProvider>
    </Provider>
  );
};

export default App;

EStyleSheet.build({
  $primaryColor: '#08639c',
});
