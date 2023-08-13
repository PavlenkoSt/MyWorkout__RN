import React, {FC} from 'react';
import {Text} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {activeDateSelector} from '@app/store/selectors/trainingDaySelectors';

const TrainingHeader: FC = () => {
  const activeDate = useSelector(activeDateSelector);

  return (
    <Text style={styles.header}>
      Workout session - {new Date(activeDate).toDateString()}
    </Text>
  );
};

export default TrainingHeader;

const styles = EStyleSheet.create({
  header: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
});
