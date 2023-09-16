import React, {FC, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {
  activeDateSelector,
  trainingDateSelector,
} from '@app/store/selectors/trainingDaySelectors';

import Actions from './Actions';
import CopyDayModal from './CopyDayModal';

const TrainingHeader: FC = () => {
  const activeDate = useSelector(activeDateSelector);
  const trainingDay = useSelector(trainingDateSelector);

  const [copyDayModalVisible, setCopyDayModalVisible] = useState(false);

  const atLeastOneExercise = !!trainingDay?.exercises.length;

  const onLongPress = () => {
    if (!atLeastOneExercise) return;

    setCopyDayModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        onLongPress={onLongPress}
        activeOpacity={atLeastOneExercise ? 0.2 : 1}>
        <Text style={styles.header}>
          Workout session - {new Date(activeDate).toDateString()}
        </Text>
      </TouchableOpacity>
      {atLeastOneExercise && (
        <CopyDayModal
          visible={copyDayModalVisible}
          onClose={() => setCopyDayModalVisible(false)}
        />
      )}
      <Actions />
    </>
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
