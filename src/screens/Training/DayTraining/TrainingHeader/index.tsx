import LottieView from 'lottie-react-native';
import React, {FC, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {
  activeDateSelector,
  trainingDateSelector,
} from '@app/store/selectors/trainingDaySelectors';

import CopyDayModal from './CopyDayModal';

const TrainingHeader: FC = () => {
  const activeDate = useSelector(activeDateSelector);
  const trainingDay = useSelector(trainingDateSelector);

  const [copyDayModalVisible, setCopyDayModalVisible] = useState(false);

  const atLeastOneExercise = !!trainingDay?.exercises.length;
  const allExercisesDone = trainingDay?.exercises.every(
    ex => ex.setsDone >= ex.sets,
  );

  const onLongPress = () => {
    if (!atLeastOneExercise) return;

    setCopyDayModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        onLongPress={onLongPress}
        activeOpacity={atLeastOneExercise ? 0.2 : 1}
        style={styles.header}>
        <Text style={styles.text}>
          Workout session - {new Date(activeDate).toDateString()}
        </Text>
        {atLeastOneExercise && allExercisesDone && (
          <LottieView
            source={require('@app/assets/animations/Check.json')}
            autoPlay
            loop={false}
            style={{width: 35, height: 35}}
          />
        )}
      </TouchableOpacity>
      {atLeastOneExercise && (
        <CopyDayModal
          visible={copyDayModalVisible}
          onClose={() => setCopyDayModalVisible(false)}
        />
      )}
    </>
  );
};

export default TrainingHeader;

const styles = EStyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
});
