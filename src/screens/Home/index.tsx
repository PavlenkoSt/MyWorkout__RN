import React, {useMemo} from 'react';
import {View} from 'react-native';
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import useGetTrainingDaysFromDB from '@app/hooks/useGetTrainingDaysFromDB';
import datesService from '@app/services/dates.service';
import {
  activeDateSelector,
  allTrainingDaysSelector,
} from '@app/store/selectors/trainingDaySelectors';
import {changeActiveDate} from '@app/store/slices/trainingDaySlice';

import CalendarTodayBtn from '@app/components/CalendarTodayBtn';
import DayTraining from './DayTraining';

const Home = () => {
  const dispatch = useDispatch();

  const activeDate = useSelector(activeDateSelector);
  const trainingDays = useSelector(allTrainingDaysSelector);

  const datesToMark = useMemo(() => {
    const marked: MarkedDates = {};

    trainingDays.forEach(day => {
      const isPassedDate = datesService.isPassedDate(new Date(day.date));
      const trainingDone = day.exercises.every(
        exercise => exercise.setsDone >= exercise.sets,
      );

      marked[day.date] = {
        marked: true,
        inactive: isPassedDate,
        customStyles: {
          container: {
            borderWidth: isPassedDate || trainingDone ? 1 : 0,
            borderColor: trainingDone ? 'green' : '#e8411c',
          },
        },
      };
    });

    return marked;
  }, [trainingDays]);

  useGetTrainingDaysFromDB();

  return (
    <View style={styles.container}>
      <CalendarProvider
        date={activeDate}
        onDateChanged={date => dispatch(changeActiveDate(date))}>
        <ExpandableCalendar
          firstDay={1}
          markingType="custom"
          markedDates={datesToMark}
        />
        <DayTraining date={activeDate} key={activeDate} />
        <CalendarTodayBtn />
      </CalendarProvider>
    </View>
  );
};

export default Home;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$bgColor',
    flex: 1,
  },
});
