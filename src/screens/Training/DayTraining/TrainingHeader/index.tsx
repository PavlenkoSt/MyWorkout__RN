import LottieView from 'lottie-react-native';
import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {
  activeDateSelector,
  trainingDateSelector,
} from '@app/store/selectors/trainingDaySelectors';

import ContextMenu from '@app/components/UI-kit/ContextMenu';

import PresetModal from '@app/components/PresetModal';
import CopyDayModal from './CopyDayModal';

const TrainingHeader: FC = () => {
  const activeDate = useSelector(activeDateSelector);
  const trainingDay = useSelector(trainingDateSelector);

  const [copyDayModalVisible, setCopyDayModalVisible] = useState(false);
  const [presetModalVisible, setPresetModalVisible] = useState(false);

  const atLeastOneExercise = !!trainingDay?.exercises.length;
  const allExercisesDone = trainingDay?.exercises.every(
    ex => ex.setsDone >= ex.sets,
  );

  return (
    <>
      <ContextMenu
        disabled={!atLeastOneExercise}
        actions={[
          {
            action: () => setCopyDayModalVisible(true),
            text: 'Copy training day to',
          },
          {action: () => setPresetModalVisible(true), text: 'Save as preset'},
        ]}>
        <View style={styles.header}>
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
        </View>
      </ContextMenu>
      {atLeastOneExercise && (
        <>
          <CopyDayModal
            visible={copyDayModalVisible}
            onClose={() => setCopyDayModalVisible(false)}
          />
          <PresetModal
            visible={presetModalVisible}
            onClose={() => setPresetModalVisible(false)}
            presetToEdit={null}
            initialExercises={trainingDay.exercises}
          />
        </>
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
