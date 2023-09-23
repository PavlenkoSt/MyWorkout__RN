import React, {FC} from 'react';
import * as DatePickerComponent from 'react-native-date-picker';

interface IProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker: FC<IProps> = ({date, setDate}) => {
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
};

export default DatePicker;
