import React from 'react';
import * as DatePickerComponent from 'react-native-date-picker';

interface IProps {
  date: Date;
  setDate: (date: Date) => void;
}

export default function DatePicker({date, setDate}: IProps) {
  return (
    <DatePickerComponent.default
      date={date}
      onDateChange={setDate}
      mode="date"
      androidVariant="iosClone"
      fadeToColor="none"
      theme="dark"
      locale="en"
    />
  );
}
