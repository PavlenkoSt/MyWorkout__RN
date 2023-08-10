/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';

import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import AddTrainingDay from './components/AddTrainingDay';
import AgendaItem from './components/AgendaItem';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}
function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split('T')[0];
}

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
    title: dates[0],
    data: [{hour: '12am', duration: '1h', title: 'First Yoga'}],
  },
];

const App = (): JSX.Element => {
  const marked = useRef(getMarkedDates());

  return (
    <CalendarProvider date={agendaItems[0].title} showTodayButton>
      <ExpandableCalendar firstDay={1} />
      <AgendaList
        sections={agendaItems}
        renderItem={AgendaItem}
        sectionStyle={{}}
        ListFooterComponent={() => <AddTrainingDay />}
      />
    </CalendarProvider>
  );
};

export default App;

EStyleSheet.build({
  $primaryColor: '#08639c',
});
